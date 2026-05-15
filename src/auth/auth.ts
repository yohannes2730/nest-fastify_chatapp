import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongodb-adapter";

const client = new MongoClient(process.env.DATABASE_URL!);
await client.connect();

const db = client.db();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_BASE_URL!,

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});