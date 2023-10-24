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