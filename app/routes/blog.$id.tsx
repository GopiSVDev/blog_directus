import { getBlogById, type Blog } from "~/.server/blogs";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.id) return;

  const blog = await getBlogById(params.id);

  return blog;
}

const BlogPage = ({ loaderData }: { loaderData: Blog | undefined }) => {
  const navigate = useNavigate();
  const blog = loaderData;

  if (!blog) return <>Blog Not Found</>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <div>
        <strong>Author ID:</strong> {blog.author}
      </div>
      <div>
        <strong>Status:</strong> {blog.status}
      </div>
      <div>
        <strong>User Created:</strong> {blog.user_created}
      </div>
      <div>
        <strong>Date Created:</strong>{" "}
        {new Date(blog.date_created).toLocaleString()}
      </div>
      <div>
        <strong>User Updated:</strong> {blog.user_updated ?? "N/A"}
      </div>
      <div>
        <strong>Date Updated:</strong>{" "}
        {blog.date_updated
          ? new Date(blog.date_updated).toLocaleString()
          : "N/A"}
      </div>
      <div>
        <strong>ID:</strong> {blog.id}
      </div>
    </div>
  );
};

export default BlogPage;
