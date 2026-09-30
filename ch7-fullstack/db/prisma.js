import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mariadb from 'mariadb';
import 'dotenv/config';

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'webapp',
  connectionLimit: 5
});

const adapter = new PrismaMariaDb(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
