import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string // your mongodb connection string
const options = {}

declare global {
  var _mongoClient: MongoClient
}

class Singleton {
  private static _instance: Singleton
  private client: MongoClient

  private constructor() {
    if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      this.client =
        global._mongoClient ??
        (global._mongoClient = new MongoClient(uri, options))
    } else {
      this.client = new MongoClient(uri, options)
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton()
    }
    return this._instance.client
  }
}
const client = Singleton.instance

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default client
