import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "apps/matches/prisma/schema.prisma",
  migrations: {
    path: "apps/matches/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL_MATCHES"),
  },
});
