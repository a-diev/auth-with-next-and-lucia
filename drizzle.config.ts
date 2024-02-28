import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is empty.");

export default {
  schema: './app/configs/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
