import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  firstName: text('first_name'),
  lastName: text('last_name'),
  userName: text('username', { length: 32 }).notNull().unique(),
  email: text('email').notNull()
});
export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export const userKey = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password')
});
export const insertUserKeySchema = createInsertSchema(userKey);
export const selectUserKeySchema = createSelectSchema(userKey);

export const userSession = sqliteTable('user_session', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  activeExpires: integer('active_expires').notNull(),
  idleExpires: integer('idle_expires').notNull()
});
export const insertUserSessionSchema = createInsertSchema(userSession);
export const selectUserSessionSchema = createSelectSchema(userSession);
