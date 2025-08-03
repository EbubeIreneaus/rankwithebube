import { db } from "~~/server/db";
import { blogTable } from "~~/server/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    if (typeof slug !== "string") {
      return createError({
        statusCode: 401,
        statusMessage: "Invalid Parameter",
      });
    }
    const [blogPost] = await db
      .select()
      .from(blogTable)
      .where(and(eq(blogTable.slug, slug), eq(blogTable.published, true)));

    if (!blogPost) {
      return createError({
        statusCode: 404,
        statusMessage: "Article Not Found",
      });
    }

    const categories = await db
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
          eq(blogTable.category, blogPost.category || "business"),
          eq(blogTable.published, true),
          ne(blogTable.id, blogPost.id)
        )
      )
      .orderBy(desc(blogTable.views))
      .limit(12);

    return { blog: blogPost, related: categories };
  } catch (error: any) {
    return createError({
      statusCode: 500,
      statusMessage: "unknown server error",
    });
  }
});
