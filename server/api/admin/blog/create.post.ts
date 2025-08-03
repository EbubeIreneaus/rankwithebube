import { db } from "~~/server/db";
import { createInsertSchema, CreateInsertSchema } from "drizzle-zod";
import { blogTable } from "~~/server/db/schema";
import slugify from "slugify";
import { count, eq } from "drizzle-orm";

const schema = createInsertSchema(blogTable);

export default defineEventHandler(async (event) => {
  try {
    const { error, data } = await readValidatedBody(event, schema.safeParse);

    if (error)
      return createError({
        statusCode: 401,
        statusMessage: error.issues[0]?.message || 'Validation Failed',
      });

    let baseSlug = slugify(data.title, {lower: true});
    let blogSlug = baseSlug;
    let prefix = 1;
    let blogsWithTitle =  await db.select({ total: count() }).from(blogTable).where(eq(blogTable.slug, blogSlug))
    
    while (blogsWithTitle[0]?.total > 0) {
        blogSlug = `${baseSlug}-${prefix++}`
        blogsWithTitle =  await db.select({ total: count() }).from(blogTable).where(eq(blogTable.slug, blogSlug))
    }

    await db.insert(blogTable).values({ ...data, slug: blogSlug });

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
