import { redirect } from "react-router";
import { deleteBlog } from "~/.server/blogs";
import type { Route } from "../+types/home";

export async function action({ params, request }: Route.ActionArgs) {
  const { id } = params as { id?: string };
  if (!id) return redirect("/dashboard");

  try {
    await deleteBlog(parseInt(id), request);
    return redirect("/dashboard");
  } catch {
    return redirect("/dashboard");
  }
}
