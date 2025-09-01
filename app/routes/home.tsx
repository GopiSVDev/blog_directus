import BlogItem from "~/components/blogItem";
import type { Route } from "./+types/home";
import { Box, Text, Title } from "@mantine/core";
import { fetchAllBlogs, fetchUserDetails } from "~/.server/blogs";
import type { FullBlog } from "~/types/blog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog App" },
    { name: "description", content: "Create or View Blogs" },
  ];
}

export async function loader() {
  try {
    const blogs = await fetchAllBlogs();
    const enrichedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const displayName = await fetchUserDetails(blog.author);
        return {
          ...blog,
          author: displayName,
        };
      })
    );

    return enrichedBlogs;
  } catch (error) {
    console.error("Failed to load blogs:", error);
    return [];
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const blogs: FullBlog[] = loaderData;

  return (
    <div style={{ paddingBlock: "10px" }}>
      <Title order={1} ta="center" style={{ paddingBlock: "20px" }}>
        All Published Blogs
      </Title>

      {blogs?.length === 0 ? (
        <Text ta="center">No Blogs</Text>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          {blogs?.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </Box>
      )}
    </div>
  );
}
