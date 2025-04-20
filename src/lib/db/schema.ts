import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text()
		.notNull()
		.$defaultFn(() => createId()),
	email: text().notNull().unique(),
	name: text().notNull(),
});
