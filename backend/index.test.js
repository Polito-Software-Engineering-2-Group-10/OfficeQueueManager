import request from 'supertest';
import { server, app, psqlDriver } from './index.js';
import { jest } from '@jest/globals';
import { ServiceTypeTable } from './dbentities.js';

/// Unit test here

afterAll(async () => {
    await psqlDriver.closeAll();
    server.close();
});