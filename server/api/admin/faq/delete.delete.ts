import { db } from "~~/server/db";
import { faqTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event) as {id: string};
    const numericId = Number(id);

    await db.delete(faqTable).where(eq(faqTable.id, numericId));

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
