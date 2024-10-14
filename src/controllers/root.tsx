import type { Context } from 'hono'
import type { BlankEnv, BlankInput } from 'hono/types';

export const healthcheck = (c: Context<BlankEnv, "/", BlankInput>) => {
    return c.text('Hello Hono!')
}
