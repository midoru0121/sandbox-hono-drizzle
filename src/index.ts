import { serve } from '@hono/node-server'
import 'dotenv/config';
import { defineRoutes } from './routes';
import { createHonoApp } from './app';

const DB_CONNECTION_STRING = process.env.DATABASE_URL;

if (!DB_CONNECTION_STRING) {
    throw new Error("DATABASE_URL is not set in .env file");
}

(async() => {
  const app = await createHonoApp();
  defineRoutes(app)

  const port = 3000
  console.log(`Server is running on port ${port}`)
  
  serve({
    fetch: app.fetch,
    port
  })  


})()