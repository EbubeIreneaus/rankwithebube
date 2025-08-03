import { db } from "~~/server/db";
import { contactTable } from "~~/server/db/schema";
import { createInsertSchema } from "drizzle-zod";

const schema = createInsertSchema(contactTable);
export default defineEventHandler(async (event) => {
  try {
    const { sendMail } = useNodeMailer();
    const { data, error } = await readValidatedBody(event, schema.safeParse);
    if (error)
      return createError({
        statusMessage: error.issues[0].message,
        statusCode: 401,
      });

    await db.insert(contactTable).values(data);
    try {
      await sendMail({
        subject: `Incoming message - ${data.subject}`,
        to: "okigweebube7@gmail.com",
        text: data.content
      });
    } catch (error: any) {
      console.log(error.message)
    }
    return { success: true };
  } catch (error: any) {
    return createError({
      statusMessage: error.message || "unknown server error",
      statusCode: 500,
    });
  }
});
