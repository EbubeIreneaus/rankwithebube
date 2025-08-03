import { db } from "~~/server/db";
import { blogTable } from "~~/server/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { category, currentBlogId, limit } = (await getQuery(event)) as {
      category: "business" | "tech";
      currentBlogId: string;
      limit: string
    };

    if (!category || (category !== "business" && category !== "tech")) {
      return [];
    }
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
      .where(
        and(
          eq(blogTable.category, category),
          ne(blogTable.id, Number(currentBlogId)),
          eq(blogTable.published, true)
        )
      )
      .orderBy(desc(blogTable.views))
      .limit(Number(limit || '10'));
    return blogPosts;
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
});
