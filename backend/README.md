# Backend server of OfficeQueueManager

## Installation
Simply running `npm install` should install all the dependencies.
It is required to have a running PostgreSQL server with the required database setup. The guide on how to setup the database can be found in the `database/` folder of this repository.

## Running the server
To run the server, simply run `node index.js` or `npm run dev`.

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
    [{
        "name": "typeid",
        "description": "typename"
    }]
  ```

- POST `/api/bookService/:typeid`:
    - description: add a new service and update the correspongding queue.
    - request body: *none*
    - response: `200` Success
     or `503` Database server error
    - response body: 
    ```json
    
        {
        "internalid": "id",
        "ticketid": "ticketid",
        "typeid": "typeid",
        "queueid": "queueid",
        "queuelength": "queuelength",
        "waitingTime": {
          "minutes": "minutes",
          "seconds": "seconds"
        }
    }
    ```


- GET `/api/getWaitingTime/:ticketid`:

    - description: Get the Waiting time for a ticket
    - request body: *none*
    - response: `200` Success or `404` Ticket id finding error
    - response body: 

    ```json
    {
        "minutes":"minutes","seconds":"seconds"
    }
  ```

- GET `/api/UsersBefore/:ticketid`:

    - description: Get how many people before a specific user
    - request body: *none*
    - response: `200` Success `404` for ticketid not found
    - response body: 

    ```json
    {
        "numberOfPeople":"npeople"
    }
  ```

  - GET `/api/counters`:

    - description: Get all available counters
    - request body: *none*
    - response: `200` Success `503` for Database error
    - response body: 

    ```json
     [
        {
    "counterid": "counterid",
    "typeamount": "typeamount",
    "typeids": [
      "A",
      "B",
      "C"
        ]
    }
    ]
    ```


    
- GET `/api/counterService/:counterid`:

    - description: Get counter services based on the counter id
    - request body: *none*
    - response: `200` Success or `404` for counter not found
    - response body: 

    ```json
     [
  "A",
  "B",
  "C"
    ]
    ```

  - GET `/api/counter/:counterid`:

    - description: Get counter info based on the counter id
    - request body: *none*
    - response: `200` Success or `404` for counter not found
    - response body: 

    ```json
    {
  "counterid": "counterid",
  "typeamount": "typeamount",
  "typeids": [
    "A",
    "B",
    "C"
  ]
    }
   
    ```

- GET `/api/nextClient/:counterid`:

    - description: Select the next serviced client in a specific counter
    - request body: *none*
    - response: `200` Success, or `404` for ticket not found  `503` Database server error
    - response body: 

    ```json
    {
       "internalid": "internalid",
        "ticketid": "ticketid",
        "typeid": "typeid"
    }
  ```


## Users Credentials

- officequeuemanager, password:'officequeuemanager' (this user is an admin)