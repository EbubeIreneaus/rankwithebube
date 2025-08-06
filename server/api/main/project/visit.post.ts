import { db } from "~~/server/db";
import { projectTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { source } = (await readBody(event)) as { source: string };

    // Check for bots
    const userAgent = event.node.req.headers["user-agent"] || "";
    // const referer = event.node.req.headers["referer"] || "";

    const isBot =
      /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram/i.test(
        userAgent
      );

    if (isBot) {
      return false; // Block bots from triggering view count
    }

    if (!source) {
      return false;
    }
    const [project] = await db
      .select({ views: projectTable.views })
      .from(projectTable)
      .where(eq(projectTable.slug, source))
      .limit(1);
    await db
      .update(projectTable)
      .set({ views: (project.views || 0) + 1 })
      .where(eq(projectTable.slug, source));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});
