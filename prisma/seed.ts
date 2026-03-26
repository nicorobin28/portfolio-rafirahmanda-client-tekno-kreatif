import { PrismaClient, Prisma } from "../app/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
})

async function main() {
    // Buat user admin
  const hashedPassword = await bcrypt.hash("password123", 12)

  const user = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "John Doe",
      username: "admin",
      password: hashedPassword,

      // Buat profile sekaligus (nested create)
      profile: {
        create: {
          email: "john@example.com",
          linkedin: "https://linkedin.com/in/johndoe",
        },
      },

      // Buat area of focus awal
      areaOfFocus: {
        create: [
          { label: "UI/UX Design",       order: 0 },
          { label: "Product Design",     order: 1 },
          { label: "Interaction Design", order: 2 },
        ],
      },

      // Buat experience awal
      experiences: {
        create: [
          {
            company:   "Tokopedia",
            position:  "Senior UI/UX Designer",
            startDate: "2022-01",
            isCurrent: true,
            order:     0,
          },
          {
            company:   "Gojek",
            position:  "UI/UX Designer",
            startDate: "2020-03",
            endDate:   "2021-12",
            isCurrent: false,
            order:     1,
          },
        ],
      },
    },
  })

  console.log(`Seed berhasil. User ID: ${user.id}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())