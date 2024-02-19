import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://admin:rjsdn83@cluster0.2wnrtdf.mongodb.net/?retryWrites=true&w=majority'

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(uri).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(uri).connect()
}
export { connectDB }