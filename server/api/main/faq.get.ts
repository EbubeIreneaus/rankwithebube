import { db } from "~~/server/db";
import { faqTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const faq = await db.select().from(faqTable).limit(10);
    return faq.map((f) => ({ id: f.id, label: f.question, content: f.answer }));
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
});
