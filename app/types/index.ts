import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { blogTable, contactTable, faqTable, projectTable, reviewTable } from '~~/server/db/schema'

export type ProjectTypes = InferSelectModel<typeof projectTable>
export type NewProjectTypes = InferInsertModel<typeof projectTable>

export type BlogTypes = InferSelectModel<typeof blogTable>
export type NewBlogTypes = InferInsertModel<typeof blogTable>

export type MessageTypes = InferSelectModel<typeof contactTable>
export type NewMessageTypes = InferInsertModel<typeof projectTable>

export type FaqTypes = InferSelectModel<typeof faqTable>
export type NewFaqTypes = InferInsertModel<typeof faqTable>

export type ReviewTypes = InferSelectModel<typeof reviewTable>
export type NewReviewTypes = InferInsertModel<typeof reviewTable>