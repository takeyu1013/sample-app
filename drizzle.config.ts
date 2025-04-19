import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());
export default defineConfig({
	dialect: "turso",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL ?? "",
		authToken: process.env.TURSO_AUTH_TOKEN ?? "",
	},
	out: "./drizzle",
	schema: "./src/lib/db/schema.ts",
});
