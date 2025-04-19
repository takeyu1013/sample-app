import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/libsql/web";

loadEnvConfig(process.cwd());
export const db = drizzle({
	connection: {
		url: process.env.TURSO_DATABASE_URL ?? "",
		authToken: process.env.TURSO_AUTH_TOKEN ?? "",
	},
});
