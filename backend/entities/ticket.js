'use strict';
import { psqlDriver } from '../dbdriver.js';

class Ticket {
    constructor(ticketid, typeid) {
        this.ticketid = ticketid;
        this.typeid = typeid;
    }
    toString() {
        return `Ticket ${this.ticketid} of type ${this.typeid}`;
    }
    static fromRow(row) {
        return new Ticket(row.ticketid, row.typeid);
    }
}

class TicketTable {
    constructor(dbName) {
        this.dbName = dbName;
    }
    static async initialize() {
        const counterTable = new TicketTable('officequeuemanager');
        counterTable.db = await psqlDriver.openDatabase('officequeuemanager');
        return counterTable;
    }

    async getTicketById(ticketid) {
        const row =  await this.db.executeQueryExpectOne(
            'SELECT * FROM ticket WHERE ticketid = $1',
            ticketid,
            `Ticket with id ${ticketid} not found`
        );
        return Ticket.fromRow(row);
    }
    async getTicketsByType(typeid) {
        const rows = await this.db.executeQueryExpectAny(
            'SELECT * FROM ticket WHERE typeid = $1',
            typeid
        );
        return rows.map(row => Ticket.fromRow(row));
    }
}

export { Ticket, TicketTable };