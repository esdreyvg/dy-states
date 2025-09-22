import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

// Setup function that runs before all tests
export async function setupTestDatabase(): Promise<void> {
  // Push the Prisma schema to test database
  execSync('npx prisma db push --force-reset', {
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL_TEST,
    },
  });
}

// Cleanup function that runs after all tests
export async function cleanupTestDatabase(): Promise<void> {
  // Clean up all tables
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
}

// Global setup
beforeAll(async () => {
  await setupTestDatabase();
});

// Global cleanup
afterAll(async () => {
  await cleanupTestDatabase();
  await prisma.$disconnect();
});

// Clean up after each test
afterEach(async () => {
  await cleanupTestDatabase();
});