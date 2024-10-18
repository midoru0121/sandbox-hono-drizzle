import type { Hono } from "hono";
import type { BlankSchema } from "hono/types";
import { healthcheck } from "./controllers/root";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Pool } from "pg";
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";
import { usersTable } from "./db/schema";
import { userCreate, validateUserCreate } from "./controllers/users/create";
import type { AppEnv } from "./app";


export const defineRoutes = (
    app: Hono<AppEnv, BlankSchema, "/">
) => {
    // root
    app.get('/', healthcheck)

    // users
    app.get("/users", async (c) => {
        const db = c.get("db");
        const users = await db.select().from(usersTable);
        return c.json(users);
    })

    app.post(
        "/users", 
        validateUserCreate,
        userCreate
    )
}
