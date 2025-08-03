import { db } from "~~/server/db";
import { createUpdateSchema } from "drizzle-zod";
import { blogTable } from "~~/server/db/schema";
import slugify from "slugify";
import { count, eq } from "drizzle-orm";

const schema = createUpdateSchema(blogTable);

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const numericId = Number(id);

    const { error, data } = await readValidatedBody(event, schema.safeParse);

    if (error)
      return createError({
        statusCode: 401,
        statusMessage: error.issues[0]?.message || "Validation Failed",
      });


    const [currentBlog] = await db
      .select()
      .from(blogTable)
      .where(eq(blogTable.id, numericId));

    if (!currentBlog) {
      return createError({ statusCode: 404, statusMessage: "Blog not found" });
    }

    let blogSlug = currentBlog.slug;

    // Only update slug if title changed
    if (data.title && data.title !== currentBlog.title) {
      const baseSlug = slugify(data.title, { lower: true });
      blogSlug = baseSlug;
      let prefix = 1;

      let conflict = await db
        .select({ id: blogTable.id })
        .from(blogTable)
        .where(eq(blogTable.slug, blogSlug));

      while (conflict.length && conflict[0].id !== numericId) {
        blogSlug = `${baseSlug}-${prefix++}`;
        conflict = await db
          .select({ id: blogTable.id })
          .from(blogTable)
          .where(eq(blogTable.slug, blogSlug));
      }
    }

    await db.update(blogTable).set({ ...data, slug: blogSlug }).where(eq(blogTable.id, numericId));

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
