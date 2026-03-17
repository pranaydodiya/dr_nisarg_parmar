import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env");
}

let client;
let db;

export async function connectToDatabase() {
  if (db) return db;
  
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
  }
  
  db = client.db();
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Call connectToDatabase first");
  }
  return db;
}
