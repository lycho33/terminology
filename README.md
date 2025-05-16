## Start

```
pnpm start
```

### Migrate DB

```
npx prisma migrate dev --name <migration name>
```

### Update Schema

```
npx prisma db pull
```

### Seed data

```
pnpm db:restart
```

### Docker

```
docker compose up --build
```
