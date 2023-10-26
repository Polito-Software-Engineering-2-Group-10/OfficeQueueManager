'use strict';
import { psqlDriver } from '../dbdriver.js';

class Counter {
    constructor(counterid, typeamount, typeids) {
        this.counterid = counterid;
        this.typeamount = typeamount;
        this.typeids = typeids;
    }
    toString() {
        return `Counter ${this.counterid} with ${this.typeamount} types: ${this.typeids}`;
    }
    static fromRow(row) {
        return new Counter(row.counterid, row.typeamount, row.typeids);
    }
}

class CounterTable {
    constructor(dbName) {
        this.dbName = dbName;
    }
    static async initialize() {
        const counterTable = new CounterTable('officequeuemanager');
        counterTable.db = await psqlDriver.openDatabase('officequeuemanager');
        return counterTable;
    }
    async getCounterById(counterid) {
        const row =  await this.db.executeQueryExpectOne(
            'SELECT * FROM counter WHERE counterid = $1',
            counterid,
            `Counter with id ${counterid} not found`
        );
        return Counter.fromRow(row);
    }
    async getCountersByType(typeid) {
        const rows = await this.db.executeQueryExpectAny(
            'SELECT * FROM counter WHERE $1 = ANY(typeids)',
            typeid
        );
        return rows.map(row => Counter.fromRow(row));
    }
    async getAllCounters() {
        const rows = await this.db.executeQueryExpectAny(
            'SELECT * FROM counter'
        );
        return rows.map(row => Counter.fromRow(row));
    }
}

export { Counter, CounterTable };