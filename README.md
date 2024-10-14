# hono-drizzle-sandbox

```
echo db-password > src/db/password.txt
echo DATABASE_URL=postgresql://postgres:db-password@db > .env
docker compose up
```

```
docker compose exec server pnpm drizzle-kit:push
```

```
curl http://localhost:3000
```

edit `src/db/schema.ts`

and

```
docker compose exec server pnpm drizzle-kit:generate
docker compose exec server pnpm drizzle-kit:migrate
```
