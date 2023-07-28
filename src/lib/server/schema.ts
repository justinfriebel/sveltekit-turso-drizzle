import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').notNull(),
  password: text('password').notNull()
});
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
