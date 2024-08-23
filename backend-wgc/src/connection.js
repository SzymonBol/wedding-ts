import { MongoClient } from 'mongodb';


export function getMongodbClient() {
    let mongoClient;
    const uri = process.env.DB_URI;
 
    try {
        mongoClient = new MongoClient(uri);
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    } 
 }

