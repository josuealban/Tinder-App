import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/mensajeria/schema.prisma",
  datasource: {
    url: env("DATABASE_URL_MENSAJERIA"),
  },
});
