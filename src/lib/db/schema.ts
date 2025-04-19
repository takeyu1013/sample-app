import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text().$defaultFn(() => createId()),
	name: text().notNull(),
	email: text().notNull().unique(),
});
