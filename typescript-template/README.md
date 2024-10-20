# Template for TypeScript extensions for Wirechunk

## Setup

1. Install PostgreSQL and initialize a database server locally.

2. Create a database named "wirechunk" or whatever your `.env` or `.env.local` file specifies.

3. Install the version of node specified in the `.nvmrc` file. You can use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.

4. Install dependencies:

```
npm install
```

5. Initialize your local database with core Wirechunk tables that this extension depends on by running:

```
npm run db:migrate
```

To start the local server, run:

```
npm run dev
```

You're free to add and change the tables defined in the `prisma/schema.prisma` file, but do not change the fields on the core views:
`Org`, `User`, and `Site`. You can have your own tables and views _referencing_ the core views.
