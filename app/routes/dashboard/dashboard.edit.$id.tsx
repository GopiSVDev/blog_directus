import { Container } from "@mantine/core";
import { redirect } from "react-router";
import type { Route } from "../+types/home";
import { fetchUserBlogById, updateBlog } from "~/.server/blogs";
import type { BlogStatus, FullBlog } from "~/types/blog";
import BlogForm from "~/components/blogForm";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params as { id: string };
  if (!id) redirect("/");

  try {
    const blog = await fetchUserBlogById(parseInt(id), request);
    return blog;
  } catch (error) {
    console.error("Failed to load blog:", error);
    return redirect("/");
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  const { id } = params as { id: string };
  if (!id) return redirect("/dashboard");

  const blog = await fetchUserBlogById(parseInt(id), request);
  if (!blog) return redirect("/dashboard");

  const formData = await request.formData();
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const imageUrl = formData.get("imageUrl")?.toString().trim();

  const status: BlogStatus =
    formData.get("submit") === "publish" ? "published" : "draft";

  const updatedBlog = { ...blog, title, content, imageUrl, status };

  updateBlog(parseInt(id), updatedBlog, request);

  return redirect("/dashboard");
}

export const DashboardEdit = ({
  loaderData,
}: {
  loaderData: FullBlog | undefined;
}) => {
  const blog = loaderData;
  if (!blog) return <Container py="xl">Blog not found</Container>;

  return <BlogForm blog={blog} />;
};

export default DashboardEdit;
