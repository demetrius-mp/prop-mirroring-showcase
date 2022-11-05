import Prisma, * as PrismaAll from '@prisma/client';
import { withExclude } from 'prisma-exclude';

const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;

const db = withExclude(new PrismaClient());
export default db;
