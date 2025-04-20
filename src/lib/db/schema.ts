import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text().notNull().unique(),
	name: text().notNull(),
});

export const micropostTable = sqliteTable("micropost", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	content: text().notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
});
