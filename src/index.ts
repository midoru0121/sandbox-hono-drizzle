import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/connect';
import { defineRoutes } from './routes';

const app = new Hono()

const DB_CONNECTION_STRING = process.env.DATABASE_URL;

if (!DB_CONNECTION_STRING) {
    throw new Error("DATABASE_URL is not set in .env file");
}

(async() => {
  const db = await drizzle("node-postgres", DB_CONNECTION_STRING);

  defineRoutes(app, db)

  
  const port = 3000
  console.log(`Server is running on port ${port}`)
  
  serve({
    fetch: app.fetch,
    port
  })  


})()