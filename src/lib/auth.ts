import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "./db";
import { account, session, userTable, verification } from "./db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: { account, user: userTable, session, verification },
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [openAPI()],
});
