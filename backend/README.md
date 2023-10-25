# Backend server of OfficeQueueManager

## Installation
Simply running `npm install` should install all the dependencies.
It is required to have a running PostgreSQL server with the required database setup. The guide on how to setup the database can be found in the `database/` folder of this repository.

## Running the server
To run the server, simply run `node index.js`.

## Structure
```
-- entities/  Contains the database entities
        counter.js
        queue.js
        service_type.js
        ticket.js
-- dbdriver.js  Contains the database driver and the database object, for more information on how it works, see documentation inside the file
-- index.js  The main file of the server, contains the server setup and the routes
-- dbentities.js Just a file that re-exports all the entities from the entities folder
```

## Database Tables
- Table `counter` - contains information of counter such as ID, type and amount of service it can offer: `counterid`, `typeamount`, `typeids`.
- Table `servicetype` - contains ID, name of service and estimated time for processing of each service: `typeid`, `typename`, `servicetime`.
- Table `ticket` - contains ID of ticket and ID of its service type: `ticketid`, `typeid`.
- Table `queue` - contains ID of each service type, number ID of queue and length of corresponding waiting queue: `queueid`, `typeid`, `queuelength`.
