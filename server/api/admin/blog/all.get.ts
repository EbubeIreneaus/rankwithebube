import { BlogTypes } from "~/types";
import { db } from "~~/server/db";
import { blogTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const { limit } = (await getQuery(event)) as { limit: string };
    const blogPosts = await db
      .select({
        id: blogTable.id,
        slug: blogTable.slug,
        title: blogTable.title,
        description: blogTable.description,
        category: blogTable.category,
        views: blogTable.views,
        createdAt: blogTable.createdAt,
        updatedAt: blogTable.updatedAt,
        previewImage: blogTable.previewImage,
        published: blogTable.published,
      })
      .from(blogTable)
      .limit(Number(limit || "20"));

    return blogPosts;
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
});
