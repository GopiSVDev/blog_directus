import { getBlogById } from "~/.server/blogs";
import type { Route } from "../+types/root";
import { redirect, useNavigate } from "react-router";
import type { FullBlog } from "~/types/blog";
import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export async function loader({ params }: Route.LoaderArgs) {
  try {
    if (!params.id) return redirect("/");

    const blog = await getBlogById(parseInt(params.id));

    if (!blog) return redirect("/");

    return blog;
  } catch (error) {
    console.error("Failed to load blog:", error);
    return redirect("/");
  }
}

const BlogPage = ({ loaderData }: { loaderData: FullBlog | undefined }) => {
  const navigate = useNavigate();
  const blog = loaderData;

  if (!blog) return <>Blog Not Found</>;

  return (
    <Container size="md" py="xl">
      <Button variant="outline" mb="md" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card shadow="sm" radius="md" p="lg">
        <Image
          src={
            blog.imageUrl ||
            "https://placehold.co/800x400?text=No+Image+Available"
          }
          alt={blog.title}
          height={400}
          mb="md"
          radius="md"
          fit="cover"
        />

        <Stack gap="sm">
          <Group align="center">
            <Title order={2}>{blog.title}</Title>
            <Badge
              color={blog.status === "published" ? "green" : "gray"}
              variant="light"
            >
              {blog.status === "published" ? "Published" : "Draft"}
            </Badge>
          </Group>

          <Text c="dimmed" size="sm">
            By {"{"} Author Name {"}"} |{" "}
            {new Date(blog.date_created).toLocaleDateString()}
          </Text>

          <Divider my="sm" />

          <Text>{blog.content}</Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default BlogPage;
