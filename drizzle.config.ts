import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const DB_CONNECTION_STRING = process.env.DATABASE_URL;

if (!DB_CONNECTION_STRING) {
    throw new Error("DATABASE_URL is not set in .env file");
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_CONNECTION_STRING,
  },
});