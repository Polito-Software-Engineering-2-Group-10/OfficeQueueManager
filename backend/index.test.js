import request from 'supertest';
import { server, app, psqlDriver, getWaitingTime, serviceTypeTable, queueTable, counterTable, ticketTable } from './index.js';
import { jest } from '@jest/globals';

/// Unit test here

afterAll(async () => {
    await psqlDriver.closeAll();
    server.close();
});

describe('get api/services', () => {
    test("Should retrieve a list of services", async () => {
        const retrievedServices = [{ description: "Save", name: "A" }, { description: "Loan", name: "B" },
        { description: "Transfer", name: "C" }, { description: "Remittance", name: "D" },
        { description: "Investment", name: "E" }, { description: "Stock", name: "F" }];
        jest.spyOn(serviceTypeTable, "getAllServices").mockImplementationOnce(() => retrievedServices.map(item => {
            return {
                typeid: item.name,
                typename: item.description
            };
        }));
        const response = await request(app).get("/api/services");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(retrievedServices);
    });

    test("Should throw a 503 error if a server-side error occurs", async () => {
        jest.spyOn(serviceTypeTable, "getAllServices").mockImplementationOnce(() => {
            throw new Error();
        });
        const response = await request(app).get("/api/services");
        expect(response.status).toBe(503);
        expect(response.body).toEqual({ error: "Database error during retrieving all services" });
    })
});

describe('put /api/bookService/:typeid', () => {

    test('Should throw a 404 error when the ticket creation fails', async () => {
        const typeId = 'A';
        const queueData = {
            queueid: 1,
            typeid: "A",
            queuelength: 2
        }
        jest.spyOn(queueTable, 'getQueueByType').mockImplementationOnce(() => queueData);
        jest.spyOn(queueTable, 'updateQueueDiff').mockImplementationOnce(() => {
            throw new Error("Error updating queue").message(`Database error during the booking of service with type ${typeId}: Error updating queue`);
        });
        const response = await request(app).post(`/api/bookService/${typeId}`);
        expect(response.status).toBe(503);
    });

    test('Should throw a 503 error if a database problem occurs', async () => {
        const queueData = {
            queueid: 1,
            typeid: "A",
            queuelength: 2
        }
        jest.spyOn(queueTable, 'getQueueByType').mockImplementationOnce(() => queueData);
        jest.spyOn(queueTable, 'updateQueueDiff').mockImplementationOnce(() => {
            throw new Error();
        });

        const response = await request(app)
            .post('/api/bookService/A')

        expect(response.status).toBe(503);
    });
});

describe('get /api/getWaitingTime/:ticketid', () => {
    test('Should calculate waiting time correctly', async () => {
        jest.spyOn(serviceTypeTable, 'getServiceTypeById').mockResolvedValue({ servicetime: 300 });
        jest.spyOn(ticketTable, 'getTicketsByType').mockResolvedValue([{ ticketid: 'D0' }, { ticketid: 'D1' }]);
        jest.spyOn(counterTable, 'getCountersByType').mockResolvedValue([{ counterid: '01', typeamount: 2 }]);
        const result = await getWaitingTime('D1');
        expect(result).toEqual({ minutes: 12, seconds: 30 });
    });
});

describe('get /api/UsersBefore/:ticketid', () => {
    test("Should retrieve the number of users before the specified one", async () => {
        const typeId = 'A01';
        const ticketData = [
            { ticketid: 'A1' },
            { ticketid: 'A2' },
        ];

        jest.spyOn(ticketTable, 'getTicketsByType').mockResolvedValue(ticketData);

        const response = await request(app).get(`/api/UsersBefore/${typeId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ numberOfPeople: ticketData.length });
    });
});

describe('get /api/counters/', () => {
    test("Should retrieve a list of all counters with relative services", async () => {
        const retrievedCounters = [{ counterid: "01", typeamount: 3, typeids: ["A", "B", "C"] },
        { counterid: "02", typeamount: 2, typeids: ["C", "D"] }, { counterid: "03", typeamount: 2, typeids: ["E", "F"] },
        { counterid: "04", typeamount: 1, typeids: ["E"] }, { counterid: "05", typeamount: 4, typeids: ["A", "B", "C", "D"] }];
        jest.spyOn(counterTable, "getAllCounters").mockImplementationOnce(() => { return retrievedCounters });
        const response = await request(app).get("/api/counters/");
        expect(response.body).toEqual(retrievedCounters);
    })

    test("Should throw a 503 error if a server-side error occurs", async () => {
        jest.spyOn(counterTable, "getAllCounters").mockImplementationOnce(() => {
            throw new Error("DB Failure");
        });
        const response = await request(app).get("/api/counters");
        expect(response.status).toBe(503);
        expect(response.body).toEqual({ error: "Database error during retrieving all counters: Error: DB Failure" });
    })
});

describe('get /api/counterService/:counterid', () => {
    test("Should retrieve a list of all services provided by a specific counter", async () => {
        const ServicesByCounter = ["A", "B", "C"]
        jest.spyOn(counterTable, "getCounterById").mockImplementationOnce(() => {
            return { counterid: "01", typeamount: 3, typeids: ServicesByCounter };
        });
        const response = await request(app).get("/api/counterService/01");
        expect(response.body).toEqual(ServicesByCounter);
    })

    test("Should throw a 404 error if a counter isn't found", async () => {
        jest.spyOn(counterTable, "getCounterById").mockImplementationOnce(() => {
            throw new Error("Counter not found");
        });
        const response = await request(app).get("/api/counterService/01");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Couldn't get service for counter 01: Error: Counter not found" });
    })
});

describe('get /api/counter/:counterid', () => {
    test('Should return the counter data for a valid counter ID', async () => {
        const counterId = '01'
        const counterData = {
            counterid: counterId,
            typeamount: 3,
            typeids: ['A', 'B', 'C']
        };
        jest.spyOn(counterTable, 'getCounterById').mockImplementationOnce(() => counterData);
        const response = await request(app).get(`/api/counter/${counterId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(counterData);
    });

    test('Should throw a 404 error if the id is invalid', async () => {
        const counterId = 'invalid_id';
        jest.spyOn(counterTable, 'getCounterById').mockImplementationOnce(() => {
            throw new Error("Invalid id");
        });
        const response = await request(app).get(`/api/counter/${counterId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: `Couldn't get counter ${counterId}: Error: Invalid id` });
    });
});

describe('get /api/nextClient/:counterid', () => {
    test('Should extract and return the next client for a valid counter', async () => {
        const counterId = '01';
        const counterData = {
            counterid: "01",
            typeamount: 3,
            typeids: ["A", "B", "C"]
        };
        const queuesData = [{
            queueid: 1,
            typeid: "A",
            queuelength: 2
        }];
        const ticketData = {
            ticketid: "A01",
            typeid: "A"
        };
        jest.spyOn(counterTable, 'getCounterById').mockResolvedValue(counterData);
        jest.spyOn(queueTable, 'getQueuesByType').mockResolvedValue(queuesData);
        jest.spyOn(ticketTable, 'extractFirstTicket').mockResolvedValue(ticketData);
        jest.spyOn(queueTable, 'updateQueueDiff').mockResolvedValue();

        const response = await request(app).get(`/api/nextClient/${counterId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(ticketData);
    });

    test('Should throw a 503 error if a database problem occurs', async () => {
        const counterId = '01';
        jest.spyOn(counterTable, 'getCounterById').mockRejectedValue(new Error());
        const response = await request(app).get(`/api/nextClient/${counterId}`);
        expect(response.status).toBe(503)
        expect(response.body).toEqual({ error: 'Database error during retrieving next client Error' })
    });
});
