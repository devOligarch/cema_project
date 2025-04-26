import { MongoClient, ServerApiVersion } from "mongodb"

// Throw error when there is no MongoDB URI provided
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// Declare variables to be used as arguments to form a MongoDb client connection
const uri = process.env.MONGODB_URI

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client

if (process.env.NODE_ENV === "development") {
  /* In developement , hot reloads might create multiple mongo clients and thus we need to check if one exists before creating one */

  // Create a global object
  let globalWithMongo = global

  // Check whether a MongoDB client exists , creates one if it does not exist
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }

  // Loads the client variable with the connection that is now global in the project scope
  client = globalWithMongo._mongoClient
} else {
  /** In production , create a mongo client since this code only runs once (during start) */
  client = new MongoClient(uri, options)
}

export default client
