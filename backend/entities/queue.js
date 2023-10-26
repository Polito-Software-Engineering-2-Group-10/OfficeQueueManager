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
        const row = await this.db.executeQueryExpectOne(
            'SELECT * FROM queue WHERE typeid = $1',
            typeid,
            `Queue with type ${typeid} not found`
        );
        return Queue.fromRow(row);
    }
    async getQueuesByType(typeids) {
        const rows = await this.db.executeQueryExpectAny(
            'SELECT * FROM queue WHERE typeid = ANY($1)',
            typeids
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
            'SELECT * FROM queue ORDER BY queuelength ASC LIMIT 1',
            'No queues found'
        );
        return Queue.fromRow(row);
    }
    async updateQueue(queueid, queuelength) {
        const row = await this.db.executeQueryExpectOne(
            'UPDATE queue SET queuelength = $1 WHERE queueid = $2 RETURNING *',
            queuelength,
            queueid,
            'Queue not found'
        );
        return Queue.fromRow(row);
    }
    async updateQueueDiff(queueid, diff) {
        const row = await this.db.executeQueryExpectOne(
            'UPDATE queue SET queuelength = queuelength + $1 WHERE queueid = $2 RETURNING *',
            diff,
            queueid,
            'Queue not found'
        );
        return Queue.fromRow(row);
    }
}

export { Queue, QueueTable };