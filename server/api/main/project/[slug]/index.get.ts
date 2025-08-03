import { db } from "~~/server/db";
import { projectTable } from "~~/server/db/schema";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    if (typeof slug !== "string") {
      return createError({
        statusCode: 401,
        statusMessage: "Invalid Parameter",
      });
    }
    const [projectPost] = await db
      .select()
      .from(projectTable)
      .where(
        and(eq(projectTable.slug, slug), eq(projectTable.published, true))
      );

    if (!projectPost) {
      return createError({ statusCode: 404, statusMessage: "Project Not Found" });
    }
    return projectPost;
  } catch (error: any) {
    return createError({
      statusCode: 500,
      statusMessage: "unknown server error",
    });
  }
});
