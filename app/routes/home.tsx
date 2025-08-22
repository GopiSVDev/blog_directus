import BlogItem from "~/components/blogItem";
import type { Route } from "./+types/home";
import { getAllBlogs, type Blog } from "~/.server/blogs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog App" },
    { name: "description", content: "Create or View Blogs" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const blogs: Blog[] = await getAllBlogs();

  return blogs;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const blogs = loaderData;

  return (
    <div>
      <h1>All Published Blogs</h1>

      {blogs?.length === 0 ? (
        <p>No Blogs</p>
      ) : (
        blogs?.map((blog) => <BlogItem key={blog.id} blog={blog} />)
      )}
    </div>
  );
}
