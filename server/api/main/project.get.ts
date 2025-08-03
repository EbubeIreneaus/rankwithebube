import { db } from "~~/server/db";
import { projectTable } from "~~/server/db/schema";
import {eq} from 'drizzle-orm'


export default defineEventHandler(async (event) => {
  try {

    const { limit } = (await getQuery(event)) as { limit: string };

    const projectPosts = await db
      .select({
        id: projectTable.id,
        slug: projectTable.slug,
        title: projectTable.title,
        description: projectTable.description,
        createdAt: projectTable.createdAt,
        previewImage: projectTable.previewImage,
      })
      .from(projectTable)
      .where(eq(projectTable.published, true))
      .limit(Number(limit || '10'));
    
    return projectPosts;
  } catch (error: any) {
    return createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message
    })
  }
});
