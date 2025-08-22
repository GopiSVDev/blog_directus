import { Link } from "react-router";
import type { Blog } from "~/.server/blogs";

const BlogItem = ({ blog }: { blog: Blog }) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <div>
          <small>Created: {new Date(blog.date_created).toLocaleString()}</small>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
