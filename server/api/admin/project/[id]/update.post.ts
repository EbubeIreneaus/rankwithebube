import { db } from "~~/server/db";
import { createUpdateSchema } from "drizzle-zod";
import { projectTable } from "~~/server/db/schema";
import slugify from "slugify";
import { count, eq } from "drizzle-orm";

const schema = createUpdateSchema(projectTable);

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


    const [currentProject] = await db
      .select()
      .from(projectTable)
      .where(eq(projectTable.id, numericId));

    if (!currentProject) {
      return createError({ statusCode: 404, statusMessage: "Project not found" });
    }

    let projectSlug = currentProject.slug;

    // Only update slug if title changed
    if (data.title && data.title !== currentProject.title) {
      const baseSlug = slugify(data.title, { lower: true });
      projectSlug = baseSlug;
      let prefix = 1;

      let conflict = await db
        .select({ id: projectTable.id })
        .from(projectTable)
        .where(eq(projectTable.slug, projectSlug));

      while (conflict.length && conflict[0].id !== numericId) {
        projectSlug = `${baseSlug}-${prefix++}`;
        conflict = await db
          .select({ id: projectTable.id })
          .from(projectTable)
          .where(eq(projectTable.slug, projectSlug));
      }
    }

    await db.update(projectTable).set({ ...data, slug: projectSlug }).where(eq(projectTable.id, numericId));

    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
