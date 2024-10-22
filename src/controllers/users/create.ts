import { z } from "zod";

import { createFactory } from 'hono/factory'
import { zValidator } from '@hono/zod-validator'
import { usersTable } from "../../db/schema";
import type { AppEnv } from "../../app";

// https://hono.dev/docs/guides/best-practices#best-practices
// > When possible, you should not create "Ruby on Rails-like Controllers".

const factory = createFactory<AppEnv>();

export const userCreateValidator = factory.createMiddleware(
    zValidator(
    'json',
    z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
    , (result, c) => {
        if(!result.success) {
            return c.json({ message: "Invalid!" }, 400);
        }
    }, 
))

export const userCreate = factory.createHandlers(userCreateValidator, async (c) => {
    const { name } = c.req.valid('json');
    const db = c.get("db");

    const users = await db.insert(usersTable).values({
        name,
        age: 30,
        email: ""
    });            

    console.log(`${users.oid} created!`);
    return c.json({ message: "User created" });
});
