CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(255) NOT NULL,
	`answer` text NOT NULL,
	`createdAt` datetime DEFAULT NOW(),
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`createdAt` datetime DEFAULT NOW(),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `blogs` MODIFY COLUMN `published` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `published` boolean NOT NULL;