import routerAuth from "./auth.js";
import routerBlogs from "./blog.js";

export default function router(app) {
  app.use("/api/v1/auth", routerAuth);
  app.use("/api/v1/blogs", routerBlogs);
}
