import '@/drizzle/envConfig';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';

import pg from 'pg';

import { users, NewUser } from './schema';
import * as schema from './schema';

pg.types.setTypeParser(pg.types.builtins.TIMESTAMPTZ, (val) => val);

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: true, // Ensure SSL verification
  },
});

export const db = drizzle(pool, {
  schema,
});

export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};
