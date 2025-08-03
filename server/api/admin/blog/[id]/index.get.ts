import { db } from "~~/server/db";
import { blogTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (isNaN(Number(id))) {
      return createError({
        statusCode: 401,
        statusMessage: "Invalid Parameter",
      });
    }
    const [blogPost] = await db
      .select({
        title: blogTable.title,
        content: blogTable.content,
        description: blogTable.description,
        category: blogTable.category,
        previewImage: blogTable.previewImage,
      })
      .from(blogTable)
      .where(eq(blogTable.id, Number(id)));


    if (!blogPost) {
      return createError({ statusCode: 404, statusMessage: "Blog Not Found" });
    }

    return blogPost;

    
  } catch (error: any) {
    return createError({
      statusCode: 500,
      statusMessage: "unknown server error",
    });
  }
});
