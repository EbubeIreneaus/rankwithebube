import {db} from '~~/server/db'
import {reviewTable} from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { limit } = (await getQuery(event)) as { limit: string };

    const reviews= await db.select().from(reviewTable).limit(Number(limit || '25'))

    return reviews
  } catch (error: any) {
    return createError({
        statusCode: 500,
        statusMessage: error.message || 'unknown server error'
    })
  }
})
