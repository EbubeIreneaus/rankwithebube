import { db } from "~~/server/db";
import { reviewTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const { limit } = (await getQuery(event)) as { limit: string };

    const review = await db.select().from(reviewTable).limit(Number(limit || '10'));
    return review
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
});
