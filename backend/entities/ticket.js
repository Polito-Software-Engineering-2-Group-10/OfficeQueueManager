'use strict';
import { psqlDriver } from '../dbdriver.js';

class Ticket {
    constructor(internalid, ticketid, typeid) {
        this.internalid = internalid
        this.ticketid = ticketid;
        this.typeid = typeid;
    }
    toString() {
        return `Ticket ${this.ticketid} of type ${this.typeid}`;
    }
    static fromRow(row) {
        return new Ticket(row.ticketinternalid, row.ticketid, row.typeid);
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
    async InsertNewTicket(ticketid,typeid) {
        const row = await this.db.executeQueryExpectOne(
            'INSERT INTO ticket(ticketid, typeid) VALUES ($1,$2) RETURNING *',
            ticketid,typeid,
            'Ticket not inserted'
        );
        return Ticket.fromRow(row);
    }
    async extractFirstTicket(typeid) {
        const row = await this.db.executeQueryExpectOne(
            'DELETE FROM ticket WHERE ticketid = (SELECT ticketid FROM ticket WHERE typeid = $1 ORDER BY ticketinternalid ASC LIMIT 1) RETURNING *',
            typeid,
            'Ticket not deleted'
        );
        return Ticket.fromRow(row);
    }
}

export { Ticket, TicketTable };