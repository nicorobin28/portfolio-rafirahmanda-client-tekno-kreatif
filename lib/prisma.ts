import { PrismaClient } from "../app/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 
const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 
const prisma = new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  console.log("[PRISMA] Fresh initialization. Models loaded:", Object.keys(prisma).filter(k => !k.startsWith('$')));
  globalForPrisma.prisma = prisma;
}export default prisma; 