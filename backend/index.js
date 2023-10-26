'use strict';
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { CounterTable, ServiceTypeTable, TicketTable, QueueTable } from './dbentities.js';
import { psqlDriver } from './dbdriver.js';

/// Initialize the tables, from here on we can use the table entities to interact with the database
/// e.g. const counter = await counterTable.getCounterById('01');
/// to see which functions each table entity has, check the files inside the entities folder
const counterTable = await CounterTable.initialize();
const serviceTypeTable = await ServiceTypeTable.initialize();
const ticketTable = await TicketTable.initialize();
const queueTable = await QueueTable.initialize();

const PORT = 3000;
const app = express();
app.use(morgan('dev'));
app.use(json());
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/// APIs here

//1. Retrieve the list of all available services
// GET /api/services
app.get('/api/services',
    async (req, res) => {
        try {
            const result = await serviceTypeTable.getAllServices();
            //execution of filtering the array to get the format required by the frontend
            const filteredResult = result.map(item => {
                return {
                    name: item.typeid,
                    description: item.typename
                };
            });
            res.json(filteredResult);
        } catch (err) {
            res.status(503).json({ error: `Database error during retrieving all services` });
        }
    }
);

async function getWaitingTime(ticketid) {
    const tr = (await serviceTypeTable.getServiceTypeById(ticketid.charAt(0))).servicetime;
    let nr = (await ticketTable.getTicketsByType(ticketid.charAt(0))).length;
    nr -= 1;
    if (nr === -1) nr = 0;
    const counters = await counterTable.getCountersByType(ticketid.charAt(0));
    let ki = 0.0;
    for (const counter of counters) {
        ki += (1 / counter.typeamount);
    }
    const time = (tr * (nr / ki + 0.5));
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return { minutes: minutes, seconds: seconds };
}

//2. Places the user in a queue relevant to the selected service
// I created next a POST api to insert and return the new ticket number,
// should be called in cascade after this one
//POST /api/bookService/<typeid>
app.post('/api/bookService/:typeid',
    async (req, res) => {
        try {
            const queue = await queueTable.getQueueByType(req.params.typeid);
            const queueResult = await queueTable.updateQueueDiff(queue.queueid, 1);
            const tickets = await ticketTable.getTicketsByType(req.params.typeid);
            let newTicket = null;
            if (tickets.length === 0) {
                newTicket = {
                    ticketid: req.params.typeid + '01'
                };
            } else {
                const lastPlusOne = parseInt(tickets.at(-1).ticketid.slice(1)) + 1;
                newTicket = {
                    ticketid: req.params.typeid + lastPlusOne.toString().padStart(2, '0')
                };
            }
            const ticketResult = await ticketTable.InsertNewTicket(newTicket.ticketid, req.params.typeid);
            res.json({
                ...ticketResult,
                ...queueResult,
                waitingTime: await getWaitingTime(ticketResult.ticketid)
            });
        } catch (err) {
            res.status(503).json({ error: `Database error during the booking of service with type ${req.params.typeid}: ${err}` });
        }
    }
);

//Get the Waiting time for a ticket
//4. GET /api/getWaitingTime/<ticketid>
app.get('/api/getWaitingTime/:ticketid',
    async (req, res) => {
        try {
            res.json(await getWaitingTime(req.params.ticketid));
        } catch (err) {
            res.status(404).json({ error: `Ticket id not found, ${err}` });
        }
    }
);


//Get how much people there are before a user
//5. GET /api/UsersBefore/<ticketid>,
app.get('/api/UsersBefore/:ticketid',
    async (req, res) => {
        try {
            const nPeople = (await ticketTable.getTicketsByType(req.params.ticketid.charAt(0))).length;
            res.json({ numberOfPeople: nPeople });
        } catch (err) {
            res.status(404).json({ error: `Couldn't get users before ticket with id ${req.params.ticketid}: ${err}` });
        }
    }
);

//Counters
//7.Get list of all counters
// GET /api/counters/
app.get('/api/counters/',
    async (req, res) => {
        try {
            const result = await counterTable.getAllCounters();
            res.json(result);
        } catch (err) {
            res.status(503).json({ error: `Database error during retrieving all counters: ${err}` });
        }
    }
);


//8.Get list of services from a specific counter
// GET /api/countersService/<counterid>
app.get('/api/counterService/:counterid',
    async (req, res) => {
        try {
            const result = (await counterTable.getCounterById(req.params.counterid)).typeids;
            res.json(result);
        } catch (err) {
            res.status(404).json({ error: `Couldn't get service for counter ${req.params.counterid}: ${err}` });
        }
    }
);


// 9. getCounter
// GET /api/counter/<counterid>
app.get('/api/counter/:counterid',
    async (req, res) => {
        try {
            const result = await counterTable.getCounterById(req.params.counterid);
            res.json(result);
        } catch (err) {
            res.status(404).json({ error: `Couldn't get counter ${req.params.counterid}: ${err}` });
        }
    }
);

// 10. getNextClient
// GET /api/nextClient/<counterid>
// select the first number from the longest queue among those corresponding to the service types the counter can handle
// If two or more queues have the same length, the queue associated with request type having the lowest service time is selected
app.get('/api/nextClient/:counterid',
    async (req, res) => {
        try {
            const counter = await counterTable.getCounterById(req.params.counterid);
            const queues = await queueTable.getQueuesByType(counter.typeids);
            const longestQueues = queues.sort((a, b) => b.queuelength - a.queuelength);
            if (longestQueues.length === 1) {
                const longestQueue = longestQueues[0];
                const ticket = await ticketTable.extractFirstTicket(longestQueue.typeid);
                await queueTable.updateQueueDiff(longestQueue.queueid, -1);
                res.json(ticket);
            } else {
                const serviceTypes = (await serviceTypeTable.getAllServices()).filter(service => counter.typeids.includes(service.typeid)).sort((a, b) => a.servicetime - b.servicetime);
                const serviceType = serviceTypes[0];
                const longestQueue = longestQueues.filter(queue => queue.queuelength === longestQueues[0].queuelength && queue.typeid === serviceType.typeid)[0];
                const ticket = await ticketTable.extractFirstTicket(longestQueue.typeid);
                await queueTable.updateQueueDiff(longestQueue.queueid, -1);
                res.json(ticket);
            }
        } catch (err) {
            res.status(503).json({ error: `Database error during retrieving next client ${err}` });
        }
    }
);


const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export { server, app, psqlDriver, getWaitingTime, serviceTypeTable, counterTable, ticketTable, queueTable };
