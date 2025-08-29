import BlogForm from "~/components/blogForm";
import type { Route } from "../+types/home";
import type { BlogPost, BlogStatus } from "~/types/blog";
import { createBlog } from "~/.server/blogs";
import { redirect } from "react-router";
import { getUserSession } from "~/.server/session";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const imageUrl = formData.get("imageUrl")?.toString().trim() || undefined;

  const status: BlogStatus =
    formData.get("submit") === "publish" ? "published" : "draft";

  if (!title) return "Title is required";
  if (!content) return "Content is required";

  const newBlog: BlogPost = {
    title,
    content,
    imageUrl,
    status,
  };

  await createBlog(newBlog, request);

  return redirect("/dashboard");
}

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn } = await getUserSession(request);
  if (!loggedIn) return redirect("/");
}

const DashboardCreate = ({ actionData }: Route.ComponentProps) => {
  return <BlogForm error={actionData as string | undefined} />;
};

export default DashboardCreate;
