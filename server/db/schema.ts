import { pgTable, varchar, integer, text, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const blogCategoryEnum = pgEnum('blog_category', ['business', 'tech']);

export const projectTable = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar('slug', { length: 500 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
  content: text('content').notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  github: varchar('github', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  views: integer('views').default(0),
  isLive: boolean('is_live').default(false),
  previewImage: varchar('preview_image', { length: 500 }).notNull(),
  published: boolean('published').default(false).notNull(),
  publishedDate: timestamp('published_date')
});

export const blogTable = pgTable('blogs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar('slug', { length: 500 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
  content: text('content').notNull(),
  category: blogCategoryEnum('category').default('business'),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  previewImage: varchar('preview_image', { length: 500 }).notNull(),
  published: boolean('published').default(false).notNull(),
  publishedDate: timestamp('published_date')
});

export const contactTable = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }),
  content: text('content').notNull()
});

export const faqTable = pgTable('faqs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  question: varchar('question', { length: 255 }).notNull(),
  answer: text('answer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const reviewTable = pgTable('reviews', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  content: text('content').notNull(),
  rating: integer('rating').default(5).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const subcriberTable = pgTable('subscribers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
