CREATE TABLE "blogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(500) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"content" text NOT NULL,
	"category" varchar(50) DEFAULT 'business',
	"views" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"previewImage" varchar(500) NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"publishedDate" timestamp,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "messages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255),
	"content" text
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "faqs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question" varchar(255) NOT NULL,
	"answer" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(500) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"content" text NOT NULL,
	"url" varchar(255) NOT NULL,
	"github" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"views" integer DEFAULT 0,
	"isLive" boolean DEFAULT false,
	"previewImage" varchar(500) NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"publishedDate" timestamp,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reviews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subscribers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
