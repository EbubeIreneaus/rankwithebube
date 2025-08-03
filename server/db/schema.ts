import {mysqlTable, varchar, int, text, datetime, boolean, longtext} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm';

export const projectTable = mysqlTable('projects', {
    id: int().primaryKey().autoincrement(),
    slug: varchar({length: 500}).unique().notNull(),
    title: varchar({length: 255}).notNull(),
    description: varchar({length: 1000}).notNull(),
    content: longtext(),
    url: varchar({length: 255}).notNull(),
    github: varchar({length: 255}),
    createdAt: datetime().default(sql`NOW()`),
    views: int().default(0),
    isLive: boolean().default(false),
    previewImage: varchar({length: 500}).notNull(),
    published: boolean().default(false).notNull(),
    publishedDate: datetime()
})

export const blogTable = mysqlTable('blogs', {
    id: int().primaryKey().autoincrement(),
    slug: varchar({length: 500}).unique().notNull(),
    title: varchar({length: 255}).notNull(),
    description: varchar({length: 1000}).notNull(),
    content: longtext(),
    category: varchar({length: 50, enum:['business', 'tech']}).default('business'),
    views: int().default(0),
    createdAt: datetime().default(sql`NOW()`),
    updatedAt: datetime(),
    previewImage: varchar({length: 500}).notNull(),
    published: boolean().default(false).notNull(),
    publishedDate: datetime()
})

export const contactTable = mysqlTable('messages', {
     id: int().primaryKey().autoincrement(),
     name: varchar({length: 255}).notNull(),
     email: varchar({length: 255}).notNull(),
     subject: varchar({length: 255}),
     content: text()
})

export const faqTable = mysqlTable('faqs', {
    id: int().primaryKey().autoincrement(),
    question: varchar('question',{length: 255}).notNull(),
    answer: text().notNull(),
    createdAt: datetime().default(sql`NOW()`)
})

export const reviewTable = mysqlTable('reviews', {
    id: int().primaryKey().autoincrement(),
    name: varchar('question',{length: 255}).notNull(),
    content: text().notNull(),
    rating: int().default(5).notNull(),
    createdAt: datetime().default(sql`NOW()`)
})

export const subcriberTable = mysqlTable('subscribers', {
    id: int().primaryKey().autoincrement(),
    email: varchar('email', {length: 255}).notNull(),
    createdAt: datetime().default(sql`NOW()`)
})