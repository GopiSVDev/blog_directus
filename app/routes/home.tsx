import BlogItem from "~/components/blogItem";
import type { Route } from "./+types/home";
import { blogs } from "~/types/blog";
import { Box, Grid, Text, Title } from "@mantine/core";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog App" },
    { name: "description", content: "Create or View Blogs" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div style={{ paddingBlock: "10px" }}>
      <Title order={1} ta="center" style={{ paddingBlock: "20px" }}>
        All Published Blogs
      </Title>

      {blogs?.length === 0 ? (
        <p>No Blogs</p>
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
