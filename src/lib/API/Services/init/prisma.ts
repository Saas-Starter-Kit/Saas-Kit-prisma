import 'server-only';
import { Prisma } from '@prisma/client';
//import { PrismaClient } from '@prisma/client/edge';
//import { withAccelerate } from '@prisma/extension-accelerate';

import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma;

if (process.env.NODE_ENV === 'production') {
  //prisma = new PrismaClient().$extends(withAccelerate());
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    //global.prisma = new PrismaClient().$extends(withAccelerate());
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { Prisma };

export default prisma;
