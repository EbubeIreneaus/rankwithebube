import { db } from "~~/server/db";
import { reviewTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event) as {id: string};
    const numericId = Number(id);

    await db.delete(reviewTable).where(eq(reviewTable.id, numericId));

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
