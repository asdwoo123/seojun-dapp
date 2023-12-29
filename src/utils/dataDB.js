import Mongod from 'mongod';
import { MongoClient } from 'mongodb';
import bus from '@/utils/bus';

const databaseInfo = {
    port: 27017,
    name: 'seojunDB4'
};

const server = new Mongod(databaseInfo.port);
const client = new MongoClient(`mongodb://localhost:${databaseInfo.port}`);
if (!server.isRunning) server.open();

let db = null;

export const dataDBConnect = async () => {
    try {   
        await client.connect();
        db = client.db(databaseInfo.name);
        bus.emit('dbConnect', true);        
    } catch (error) {
        console.log(error);
    }
}

export const checkDBConnect = () => {
    return db !== null;
}

export const getDBInstance = () => db;

export const getCollection = (name) => {
    if (!db) return;
    return db.collection(name);
}