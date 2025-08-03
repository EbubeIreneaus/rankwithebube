CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`createdAt` datetime DEFAULT NOW(),
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`)
);
