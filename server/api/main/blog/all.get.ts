import { db } from "~~/server/db";
import { blogTable } from "~~/server/db/schema";
import {eq} from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const { limit } = (await getQuery(event)) as { limit: string };

    const blogPosts = await db
      .select({
        id: blogTable.id,
        slug: blogTable.slug,
        title: blogTable.title,
        description: blogTable.description,
        createdAt: blogTable.createdAt,
        previewImage: blogTable.previewImage,
      })
      .from(blogTable)
      .where(eq(blogTable.published, true))
      .limit(Number(limit || "10"));

    return blogPosts;
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
});
