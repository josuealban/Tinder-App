import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "apps/mensajeria/prisma/schema.prisma",
  migrations: {
    path: "apps/mensajeria/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL_MENSAJERIA"),
  },
});
