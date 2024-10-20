# Template for TypeScript extensions for Wirechunk

To initialize your local database with core Wirechunk tables that this extension depends on, run:

```
npm run db:migrate
```

To start the local server, run:

```
npm run dev
```

You're free to add and change the tables defined in the `prisma/schema.prisma` file, but do not change the fields on the core views:
`Org`, `User`, and `Site`. You can have your own tables and views _referencing_ the core views.
