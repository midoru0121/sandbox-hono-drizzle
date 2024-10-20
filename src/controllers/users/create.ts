import type { Context } from "hono";
import { z } from "zod";

import { zValidator } from '@hono/zod-validator'
import { usersTable } from "../../db/schema";
import type { AppEnv } from "../../app";


export const validateUserCreate = zValidator(
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
    }
)

export const userCreate = async (c: Context<AppEnv, "/users", {
    in: {
        json: {
            name: string;
        };
    };
    out: {
        json: {
            name: string;
        };
    };
}>) => {
    const { name } = c.req.valid('json');
    const db = c.get("db");

    const users = await db.insert(usersTable).values({
        name,
        age: 30,
        email: ""
    });            

    console.log(`${users.oid} created!`);
    return c.json({ message: "User created" });
} 


