import pg from 'pg';

// This file is a script for creating a minimal schema corresponding to the core
// views defined in the initial Prisma schema file. It's intended for testing.

const { Client } = pg;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('A DATABASE_URL environment variable is not set');
}

const shadowDbUrl = process.env.SHADOW_DATABASE_URL;
if (!shadowDbUrl) {
  throw new Error('A SHADOW_DATABASE_URL environment variable is not set');
}

const getDbName = (url: string) => {
  const { pathname } = new URL(url);
  if (!pathname || pathname === '/') {
    throw new Error(`No database name can be extracted from "${url}"`);
  }
  return pathname.substring(1);
};

const shadowDbName = getDbName(shadowDbUrl);

const initSchema = async (client: pg.Client) => {
  await client.query(`
    do $$
    begin
      if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where typname = 'UserStatus' and n.nspname = 'public') then
        create type public."UserStatus" as enum ('Pending', 'Active', 'ExpiredInactive', 'Deactivated');
      end if;
    end $$;

    create table if not exists public."Users" (
      "id" text primary key,
      "firstName" text not null,
      "lastName" text not null,
      "email" text not null unique,
      "emailVerified" boolean not null,
      "orgId" text not null,
      "orgPrimary" boolean not null,
      "role" text not null,
      "status" public."UserStatus" not null,
      "expiresAt" timestamp with time zone,
      "createdAt" timestamp with time zone not null
    );

    create table if not exists public."Orgs" (
      "id" text primary key,
      "name" text,
      "createdAt" timestamp with time zone not null
    );

    create table if not exists public."Sites" (
      "id" text primary key,
      "domain" text not null,
      "orgId" text,
      "name" text,
      "createdAt" timestamp with time zone not null
    );
  `);
};

const appDbClient = new Client({
  connectionString: dbUrl,
});

try {
  await appDbClient.connect();
  await initSchema(appDbClient);

  await appDbClient.query(`drop database if exists ${shadowDbName}`);
  await appDbClient.query(`create database ${shadowDbName}`);
  console.log(`Created shadow database ${shadowDbName}`);
} finally {
  await appDbClient.end();
}

const shadowDbClient = new Client({
  connectionString: shadowDbUrl.toString(),
});

try {
  await shadowDbClient.connect();
  await initSchema(shadowDbClient);
} finally {
  await shadowDbClient.end();
}
