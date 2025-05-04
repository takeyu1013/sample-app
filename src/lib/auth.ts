import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, openAPI } from "better-auth/plugins";

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
	plugins: [admin(), nextCookies(), openAPI()],
	user: { changeEmail: { enabled: true } },
});
