import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function getClient(): MongoClient {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri, options);
    }
    client = global._mongoClient;
  } else {
    if (!client) {
      client = new MongoClient(uri, options);
    }
  }
  return client;
}

/**
 * Singleton MongoClient. Safe for serverless (reuse across requests).
 */
export function getMongoClient(): MongoClient {
  return getClient();
}

/**
 * Get the default database (from URI). Use for Better Auth and app collections.
 */
export function getDb(): Db {
  return getMongoClient().db();
}

/**
 * Optional: use when Better Auth or another API needs a Promise<Db>.
 */
export function getDbAsync(): Promise<Db> {
  if (process.env.NODE_ENV === "development" && global._mongoClient) {
    return Promise.resolve(global._mongoClient.db());
  }
  if (!clientPromise) {
    clientPromise = getMongoClient().connect().then((c) => c);
  }
  return clientPromise.then((c) => c.db());
}
