import { db } from "~~/server/db";
import { faqTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {

    const { limit } = (await getQuery(event)) as { limit: string };
    
    const faqs = await db
      .select()
      .from(faqTable)
      .limit(Number(limit || "20"));
    return faqs;

  } catch (error: any) {
    return createError({
      statusCode: 500,
      statusMessage: error.message || "unknown server error",
    });
  }
});
