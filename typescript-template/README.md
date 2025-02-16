# Wirechunk Extension

This is a [Wirechunk](https://wirechunk.com) extension created using the TypeScript extension template.

See [github.com/wirechunk/extension-toolkit/tree/main/typescript](https://github.com/wirechunk/extension-toolkit/tree/main/typescript) for more information.

## Setup

1. Install PostgreSQL and initialize a database server locally. You can use Docker, but if doing so make sure you have a volume for the data directory.

2. Create a database and update your `.env.local` file to have the database URL under the `CORE_DATABASE_URL` variable name.
The Wirechunk CLI will use this variable for administrative commands such as creating admin users. For example:

```
CORE_DATABASE_URL=postgresql://postgres@localhost:5432/wirechunk
```

3. Pull down the latest Wirechunk dev server Docker image and start it with the `DATABASE_URL` environment variable set to the database you created in step 2.
Also mount the extension directory to the container under the `/ext` path. Map both ports 8080 and 9001 from the container to the same ports on your host machine.

You can pass environment variables to the Docker container by using the `-e` or the `--env-file` flags.

For example:

```
docker run -d -e DATABASE_URL=postgresql://postgres@localhost:5432/wirechunk -v $(pwd):/ext -p 8080:8080 -p 9001:9001 IMAGE
```

Keep the Wirechunk dev server running while you work on the extension.

4. Install the version of node specified in the `.nvmrc` file. You can use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.

5. Install dependencies in the extension directory:

```
npm install
```

6. Initialize your local database with core Wirechunk tables that this extension depends on by running:

```
npm run db:migrate:dev
```

To start the local server, run:

```
npm run dev
```

You're free to add and change the tables defined in the `prisma/schema.prisma` file, but do not change the fields on the core views:
`Org`, `User`, and `Site`. You can have your own tables and views _referencing_ the core views.
