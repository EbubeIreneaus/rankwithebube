import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const path = event.node.req.url || "";

  if (path?.startsWith("/api/admin") && !path.startsWith("/api/admin/auth")) {
    const config = useRuntimeConfig();
    const token = getCookie(event, "Authorization");

    if (!token) {
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized: No token provided",
      });
    }

    try {
      const user = jwt.verify(token, config.JWT_SECRET) as { isAdmin: boolean };

      if (!user.isAdmin) {
        return createError({
          statusCode: 403,
          statusMessage: "Forbidden: Admins only",
        });
      }
    } catch (err) {
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized: Invalid or expired token",
      });
    }
  }
});
