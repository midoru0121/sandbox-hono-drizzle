import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/connect';
import type { Pool } from "pg";
import { DB_CONNECTION_STRING } from "./env";

export type AppEnv = {
    Variables: {
        db: NodePgDatabase<Record<string, never>> & {
            $client: Pool;
          };
    },
}

export const createHonoApp = async () => {
    const app = new Hono<AppEnv>();

    app.use(async (c, next) => {
        const db = await drizzle("node-postgres", DB_CONNECTION_STRING);
        c.set("db", db);
        await next();
    });

    return app;
};



