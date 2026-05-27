import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: "postgresql://neondb_owner:npg_rFckv5RGz2Zf@ep-green-dawn-ap12g4eg.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
})