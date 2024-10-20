-- This migration is not applied as is in production. An equivalent version of this migration is automatically
-- applied when an extension is activated. Note that the definitions of the views found here will have the same
-- schema (i.e., same columns and data types) in production, but there may be a WHERE clause that filters the
-- visible rows in the production version of the view.

create extension if not exists "btree_gin";

create extension if not exists "pg_trgm";

drop type if exists "UserStatus";

create type "UserStatus" as enum ('Pending', 'Active', 'ExpiredInactive', 'Deactivated');

drop view if exists "Users";

create view "Users" as
select
  "id",
  "firstName",
  "lastName",
  "email",
  "emailVerified",
  "orgId",
  "orgPrimary",
  "role",
  "status",
  "expiresAt",
  "createdAt"
from public."Users";

drop view if exists "Orgs";

create view "Orgs" as
select
  "id",
  "name",
  "createdAt"
from public."Orgs";

drop view if exists "Sites";

create view "Sites" as
select
  "id",
  "domain",
  "orgId",
  "name",
  "createdAt"
from public."Sites";
