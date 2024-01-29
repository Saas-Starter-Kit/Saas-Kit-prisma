import { neonConfig, Pool, PoolConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, Prisma } from '@prisma/client';
import ws from 'ws';

//www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  prisma = new PrismaClient();
  global.prisma = prisma;
}

if (process.env.NODE_ENV === 'production') {
  // setup
  neonConfig.webSocketConstructor = ws;
  const connectionString = process.env.DATABASE_URL;
  const poolConfig: PoolConfig = { connectionString };

  // instantiate
  const pool = new Pool(poolConfig);
  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter });
}

if (process.env.NODE_ENV === 'test') {
  const url = process.env.DATABASE_URL_TEST;

  prisma = new PrismaClient({
    datasources: {
      db: {
        url
      }
    }
  });
}

export { Prisma };

export default prisma;
