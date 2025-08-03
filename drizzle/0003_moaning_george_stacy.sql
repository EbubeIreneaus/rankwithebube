ALTER TABLE `blogs` MODIFY COLUMN `content` longtext;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `content` longtext;--> statement-breakpoint
ALTER TABLE `blogs` ADD `published` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `blogs` ADD `publishedDate` datetime;--> statement-breakpoint
ALTER TABLE `projects` ADD `published` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `projects` ADD `publishedDate` datetime;