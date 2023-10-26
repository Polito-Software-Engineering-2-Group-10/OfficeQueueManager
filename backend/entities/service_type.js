'use strict';
import { psqlDriver } from '../dbdriver.js';

class ServiceType {
    constructor(typeid, typename, servicetime) {
        this.typeid = typeid;
        this.typename = typename;
        this.servicetime = servicetime;
    }
    toString() {
        return `ServiceType ${this.typeid} with name ${this.typename} and service time ${this.servicetime}`;
    }
    static fromRow(row) {
        return new ServiceType(row.typeid, row.typename, row.servicetime);
    }
}

const SERVICE_TYPE_NAMES = {
    Save: 'Save',
    Loan: 'Loan',
    Transfer: 'Transfer',
    Remittance: 'Remittance',
    Investment: 'Investment',
    Stock: 'Stock',
};

class ServiceTypeTable {
    constructor(dbName) {
        this.dbName = dbName;
    }
    static async initialize() {
        const counterTable = new ServiceTypeTable('officequeuemanager');
        counterTable.db = await psqlDriver.openDatabase('officequeuemanager');
        return counterTable;
    }
    async getServiceTypeById(typeid) {
        const row =  await this.db.executeQueryExpectOne(
            'SELECT * FROM servicetype WHERE typeid = $1',
            typeid,
            `ServiceType with id ${typeid} not found`
        );
        return ServiceType.fromRow(row);
    }
    async getServiceTypeByName(typename) {
        const row =  await this.db.executeQueryExpectOne(
            'SELECT * FROM servicetype WHERE typename = $1',
            typename,
            `ServiceType with name ${typename} not found`
        );
        return ServiceType.fromRow(row);
    }
    async getAllServices() {
        const rows = await this.db.executeQueryExpectAny(
            'SELECT * FROM servicetype'
        );
        return rows.map(row => ServiceType.fromRow(row));
    }
}

export { ServiceType, ServiceTypeTable, SERVICE_TYPE_NAMES };