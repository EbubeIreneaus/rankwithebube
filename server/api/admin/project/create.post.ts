import { db } from "~~/server/db";
import { createInsertSchema, CreateInsertSchema } from "drizzle-zod";
import { projectTable } from "~~/server/db/schema";
import slugify from "slugify";
import { count, eq } from "drizzle-orm";

const schema = createInsertSchema(projectTable);

export default defineEventHandler(async (event) => {
  try {
    const { error, data } = await readValidatedBody(event, schema.safeParse);

    if (error)
      return createError({
        statusCode: 401,
        statusMessage: error.issues[0]?.message || 'Validation Failed',
      });

    let baseSlug = slugify(data.title, {lower: true});
    let projectSlug = baseSlug;
    let prefix = 1;
    let projectsWithTitle =  await db.select({ total: count() }).from(projectTable).where(eq(projectTable.slug, projectSlug))
    
    while (projectsWithTitle[0]?.total > 0) {
        projectSlug = `${baseSlug}-${prefix++}`
        projectsWithTitle =  await db.select({ total: count() }).from(projectTable).where(eq(projectTable.slug, projectSlug))
    }

    await db.insert(projectTable).values({ ...data, slug: projectSlug });

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
