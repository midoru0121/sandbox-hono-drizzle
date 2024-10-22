# sandbox-hono-drizzle

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

```
curl -X GET http://localhost:3000/users
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "john", "age": 24, "email": "john@example.com"}'
```

