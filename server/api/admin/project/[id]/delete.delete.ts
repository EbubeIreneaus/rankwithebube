import { db } from "~~/server/db";
import { projectTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const numericId = Number(id);

    await db.delete(projectTable).where(eq(projectTable.id, numericId));

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
