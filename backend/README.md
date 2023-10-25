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
- Table `ticket` - contains an internal ID and an normal ID of ticket and ID of its service type: `ticketinternalid`, `ticketid`, `typeid`.
- Table `queue` - contains ID of each service type, number ID of queue and length of corresponding waiting queue: `queueid`, `typeid`, `queuelength`.

## API Server

- GET `/api/services`:

    - description: get all available services now
    - request body: *none*
    - response: `200` Success or `503` Database server error
    - response body: 

    ```json
    {
        "name": "typeid",
        "description": "typename"
    }
  ```

- POST `/api/bookService/:typeid`:
    - description: add a new service and update the correspongding queue.
    - request body: *none*
    - response: `200` Success or `404` Queue data update error or `503` Database server error
    - response body: 
    ```json
    {
        "ticketinternalid" "ticketid" "typeid"
        "queueid" "typeid" "queuelength"
        "waitingTime:" "minutes":"minutes","seconds":"seconds"
    }
    ```


- GET `/api/getWaitingTime/:ticketid`:

    - description: Get the Waiting time for a ticket
    - request body: *none*
    - response: `200` Success
    - response body: 

    ```json
    {
        "minutes":"minutes","seconds":"seconds"
    }
  ```

- GET `/api/UsersBefore/:ticketid`:

    - description: Get how many people before a specific user
    - request body: *none*
    - response: `200` Success
    - response body: 

    ```json
    {
        "numberOfPeople":"npeople"
    }
  ```

- 7
- 8
- 9

- GET `/api/nextClient/:counterid`:

    - description: Select the next serviced client in a specific counter
    - request body: *none*
    - response: `200` Success or `503` Database server error
    - response body: 

    ```json
    {
        "ticketinternalid" "ticketid" "typeid"
    }
  ```


## Users Credentials

- officequeuemanager, password:'officequeuemanager' (this user is an admin)