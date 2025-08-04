CREATE TYPE "public"."blog_category" AS ENUM('business', 'tech');--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "category" SET DEFAULT 'business'::"public"."blog_category";--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "category" SET DATA TYPE "public"."blog_category" USING "category"::"public"."blog_category";--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "preview_image" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "published_date" timestamp;--> statement-breakpoint
ALTER TABLE "faqs" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "is_live" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "preview_image" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "published_date" timestamp;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "updatedAt";--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "previewImage";--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "publishedDate";--> statement-breakpoint
ALTER TABLE "faqs" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "isLive";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "previewImage";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "publishedDate";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "question";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "subscribers" DROP COLUMN "createdAt";