import 'dotenv/config'
import {drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg';
import * as schema from './schema'

const poolConnection = new Pool({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'my_database',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    ssl: process.env.DB_SSLMODE === 'require' ? { rejectUnauthorized: false } : false
})

export const db = drizzle(poolConnection, {schema})