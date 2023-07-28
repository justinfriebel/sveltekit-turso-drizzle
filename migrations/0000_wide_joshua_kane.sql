CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	`first_name` text,
	`last_name` text,
	`email` text NOT NULL,
	`password` text NOT NULL
);
