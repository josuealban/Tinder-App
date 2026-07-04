import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "apps/usuarios/prisma/schema.prisma",
  migrations: {
    path: "apps/usuarios/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL_USUARIOS"),
  },
});
