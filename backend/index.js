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

console.log(await counterTable.getCounterById('01'));

/// APIs here

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});