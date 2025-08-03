import { db } from "~~/server/db";
import { faqTable } from "~~/server/db/schema";
import { createInsertSchema } from "drizzle-zod";

const schema = createInsertSchema(faqTable);

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await readValidatedBody(event, schema.safeParse);
    if (error)
      return createError({
        statusMessage: error.issues[0].message,
        statusCode: 401,
      });

      await db.insert(faqTable).values(data)
      return {success: true}
  } catch (error: any) {
    return createError({
        statusMessage: error.message || 'unknown server error',
        statusCode: error.statusCode || 400,
      });
  }
});
