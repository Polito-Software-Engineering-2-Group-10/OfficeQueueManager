'use strict';
import { psqlDriver } from '../dbdriver.js';

class Queue {
    constructor(queueid, typeid, queuelength) {
        this.queueid = queueid;
        this.typeid = typeid;
        this.queuelength = queuelength;
    }
    toString() {
        return `Queue ${this.queueid} of type ${this.typeid} with ${this.queuelength} minutes to wait`;
    }
    static fromRow(row) {
        return new Queue(row.queueid, row.typeid, row.queuelength);
    }
}

class QueueTable {
    constructor(dbName) {
        this.dbName = dbName;
    }
    static async initialize() {
        const counterTable = new QueueTable('officequeuemanager');
        counterTable.db = await psqlDriver.openDatabase('officequeuemanager');
        return counterTable;
    }
    async getQueueById(queueid) {
        const row =  await this.db.executeQueryExpectOne(
            'SELECT * FROM queue WHERE queueid = $1',
            queueid,
            `Queue with id ${queueid} not found`
        );
        return Queue.fromRow(row);
    }
    async getQueueByType(typeid) {
        const rows = await this.db.executeQueryExpectAny(
            'SELECT * FROM queue WHERE typeid = $1',
            typeid
        );
        return rows.map(row => Queue.fromRow(row));
    }
    async getShortestQueueByType(typeid) {
        const row = await this.db.executeQueryExpectOne(
            'SELECT * FROM queue WHERE typeid = $1 ORDER BY queuelength ASC LIMIT 1',
            typeid
        );
        return Queue.fromRow(row);
    }
    async getShortestQueue() {
        const row = await this.db.executeQueryExpectOne(
            'SELECT * FROM queue ORDER BY queuelength ASC LIMIT 1'
        );
        return Queue.fromRow(row);
    }
    async updateQueue(queueid, queuelength) {
        await this.db.executeQuery(
            'UPDATE queue SET queuelength = $1 WHERE queueid = $2',
            queuelength,
            queueid
        );
    }
}

export { Queue, QueueTable };