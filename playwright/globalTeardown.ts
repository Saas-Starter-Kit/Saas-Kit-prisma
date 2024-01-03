import { clearAllDB } from './prisma';

async function globalTeardown() {
  try {
    await clearAllDB();
  } catch (error) {
    throw error;
  }
}

export default globalTeardown;
