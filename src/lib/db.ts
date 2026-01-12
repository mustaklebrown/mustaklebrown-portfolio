import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as {
  prismaDb: PrismaClient;
};

const prisma = globalForPrisma.prismaDb || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaDb = prisma;

export default prisma;
