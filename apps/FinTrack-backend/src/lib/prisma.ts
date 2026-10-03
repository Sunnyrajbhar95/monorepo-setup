import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({
  connectionString,
  // max 10 connections in the pool
  max: 10,
  // 30 sec baad idle connection close
  idleTimeoutMillis: 30000,
  // 2 sec mein connect na hua toh error throw karo
  connectionTimeoutMillis: 2000,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
export { prisma };
