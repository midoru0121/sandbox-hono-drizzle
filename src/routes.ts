import type { Hono } from "hono";
import type { BlankEnv, BlankSchema } from "hono/types";
import { healthcheck } from "./controllers/root";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Pool } from "pg";
import { usersTable } from "./db/schema";

export const defineRoutes = (
    app: Hono<BlankEnv, BlankSchema, "/">,
    db: NodePgDatabase<Record<string, never>> & {
        $client: Pool;
      }
) => {
    // root
    app.get('/', healthcheck)

    // users
    app.get("/users", async (c) => {
        const users = await db.select().from(usersTable);
        return c.json(users);
    })
}
