import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/usuarios/schema.prisma",
  datasource: {
    url: env("DATABASE_URL_USUARIOS"),
  },
});
