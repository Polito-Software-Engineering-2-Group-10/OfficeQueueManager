'use strict';
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { CounterTable, ServiceTypeTable, TicketTable, QueueTable } from './dbentities.js';

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

//console.log(await counterTable.getCounterById('01'));

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
//2. Places the user in a queue relevant to the selected service
// I created next a POST api to insert and return the new ticket number,
// should be called in cascade after this one
//PUT /api/bookService/<typeid>
app.put('/api/bookService/:typeid',
  async (req, res) => {
        const queueA = await queueTable.getQueueByType(req.params.typeid);
        let length=queueA[0].queuelength;
        let id=queueA[0].queueid;
        length=length+1;
    const queue = {
        queueid: id,
        queuelength:length
    };
    try {
      const result = await queueTable.updateQueue(queue.queueid,queue.queuelength); 
      if (result.error)
      res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
       res.status(503).json({ error: `Database error during the update of queue ${queue.queueid}: ${err}` });
    }
  }
);
//Insert a new ticket and return the ticket number
//3.POST /api/receiveTicketNumber/<typeid>
app.post('/api/receiveTicketNumber/:typeid',
async (req, res) => {
    const tickets = await ticketTable.getTicketsByType(req.params.typeid);
    const lastPlusOne= parseInt(tickets[tickets.length-1].ticketid.slice(1))+1;
    const newTicket=
    {
        ticketid: req.params.typeid+lastPlusOne.toString()
    };
    try
    {
        const result = await ticketTable.InsertNewTicket(newTicket.ticketid,req.params.typeid); 
        if (result.error)
        res.status(404).json(result);
        else
        res.json(newTicket);
        
    }
    catch (err)
    {
        res.status(503).json({ error: `Database error during the insert of ticket ${newTicket}: ${err}` });

    }
}
);

//Get the Waiting time for a ticket
//4. GET /api/getWaitingTime/<ticketid>
app.get('/api/getWaitingTime/:ticketid',
async(res,req) => {
    
    console.log(5*((4/1+(1/2))+1/2));

}


);


//Get how much people there are before a user
//5. GET /api/UsersBefore/<ticketid>,
app.get('/api/UsersBefore/:ticketid',
async(res,req) => {
    

}


);


//Removes a prenotation related to a ticket
//6.GET /api/CancelPrenotation/<ticketid>,
app.delete('/api/CancelPrenotation/:ticketid',
async(res,req) => {
    

}


);







/// APIs here

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});