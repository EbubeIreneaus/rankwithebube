import { db } from "~~/server/db";
import { blogTable } from "~~/server/db/schema";
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
    const [blog] = await db
      .select({ views: blogTable.views })
      .from(blogTable)
      .where(eq(blogTable.slug, source))
      .limit(1);
    await db
      .update(blogTable)
      .set({ views: (blog.views || 0) + 1 })
      .where(eq(blogTable.slug, source));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});
