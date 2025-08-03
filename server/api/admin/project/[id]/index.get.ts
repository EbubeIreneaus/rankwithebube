import { db } from "~~/server/db";
import { projectTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (isNaN(Number(id))) {
       return createError({statusCode: 401, statusMessage: 'Invalid Parameter'});
    }
    const [projectPost] = await db
      .select({
        title: projectTable.title,
        content: projectTable.content,
        description: projectTable.description,
        isLive: projectTable.isLive,
        url: projectTable.url,
        github: projectTable.github,
        previewImage: projectTable.previewImage
      })
      .from(projectTable)
      .where(eq(projectTable.id, Number(id))); 
   

    if (!projectPost) {
      return createError({statusCode: 404, statusMessage: 'Project Not Found'});
    }
    return projectPost;
  } catch (error: any) {
        return createError({statusCode: 500, statusMessage: 'unknown server error'});

  }
});
