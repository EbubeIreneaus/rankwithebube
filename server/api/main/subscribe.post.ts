import { db } from "~~/server/db";
import { subcriberTable } from "~~/server/db/schema";
import { createInsertSchema } from "drizzle-zod";

const schema = createInsertSchema(subcriberTable);

export default defineEventHandler(async (event) => {
  try {
    const { sendMail } = useNodeMailer();
    const { data, error } = await readValidatedBody(event, schema.safeParse);
    if (error)
      return createError({
        statusMessage: error.issues[0].message,
        statusCode: 401,
      });

    await db.insert(subcriberTable).values(data);
    try {
      await sendMail({
        subject: `New subscriber`,
        to: "dev@rankwithebube.com",
        text: `you have a new subscriber - ${data.email}`
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
