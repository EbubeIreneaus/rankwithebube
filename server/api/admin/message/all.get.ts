import {db} from '~~/server/db'
import {contactTable} from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { limit } = (await getQuery(event)) as { limit: string };

    const messages = await db.select().from(contactTable).limit(Number(limit || '20'))
    return messages
  } catch (error: any) {
    return createError({
        statusCode: 500,
        statusMessage: error.message || 'unknown server error'
    })
  }
})
