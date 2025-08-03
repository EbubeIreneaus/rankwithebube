CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(500) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1000) NOT NULL,
	`content` text,
	`category` varchar(50) DEFAULT 'business',
	`views` int DEFAULT 0,
	`createdAt` datetime DEFAULT NOW(),
	`updatedAt` datetime,
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogs_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`subject` varchar(255),
	`content` text,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(500) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1000) NOT NULL,
	`content` text,
	`url` varchar(255) NOT NULL,
	`createdAt` datetime DEFAULT NOW(),
	`views` int DEFAULT 0,
	`isLive` boolean DEFAULT false,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
