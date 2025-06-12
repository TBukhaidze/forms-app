import { PrismaClient } from "@prisma/client";

const globalPrisma = global.prisma;
const prisma = globalPrisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
