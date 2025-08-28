import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/mainLayout.tsx", [
    index("routes/home.tsx"),
    route("signup", "routes/auth/signup.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("logout", "routes/auth/logout.tsx"),
    route("blog/:id", "routes/blog.$id.tsx"),

    ...prefix("dashboard", [
      index("routes/dashboard/dashboard.tsx"),
      route("create", "routes/dashboard/dashboard.create.tsx"),
      route("edit/:id", "routes/dashboard/dashboard.edit.$id.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
