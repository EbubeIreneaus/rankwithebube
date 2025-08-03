import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const {email, password} = body
    if (email==config.admin.email && password == config.admin.password) {
      const token = jwt.sign({isAdmin: true}, config.JWT_SECRET)
      setCookie(event, 'Authorization', token, {
        secure: true,
        sameSite: true
      })
      return {success: true}
    }
    return  createError({
        statusCode: 404 ,
        statusMessage: 'Admin details not found'
    })
  } catch (error: any) {
    return  createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message || 'unknown server error'
    })
  }
})
