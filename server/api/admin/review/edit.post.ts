import { db } from "~~/server/db";
import { reviewTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";

const schema = createUpdateSchema(reviewTable);

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await readValidatedBody(event, schema.safeParse);
    if (error)
      return createError({
        statusMessage: error.issues[0].message,
        statusCode: 401,
      });

    if (!data.id)
      return createError({
        statusMessage: "cannot update review without unique id",
        statusCode: 401,
      });

      console.log(data)

    await db
      .update(reviewTable)
      .set(data)
      .where(eq(reviewTable.id, Number(data.id)));
    return { success: true };
  } catch (error: any) {
    return createError({
      statusMessage: error.message || "unknown server error",
      statusCode: error.statusCode || 400,
    });
  }
});
