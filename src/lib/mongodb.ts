import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let clientPromise: Promise<typeof mongoose>;

if (process.env.APP_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    mongoose: Promise<typeof mongoose>;
  };
  if (!globalWithMongo.mongoose) {
    globalWithMongo.mongoose = mongoose.connect(MONGODB_URI);
  }
  clientPromise = globalWithMongo.mongoose;
} else {
  clientPromise = mongoose.connect(MONGODB_URI);
}

export default clientPromise;

export async function dbConnect() {
  await clientPromise;
  return mongoose.connection;
}