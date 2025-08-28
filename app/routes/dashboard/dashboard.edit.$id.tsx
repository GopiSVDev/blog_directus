import {
  Container,
  Stack,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Title,
  Image,
} from "@mantine/core";
import { Form, useNavigate } from "react-router";
import type { Route } from "../+types/home";
import type { BlogStatus, FullBlog } from "~/types/blog";
import { getBlogById } from "~/.server/blogs";

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    const blog = await getBlogById(parseInt(params.id));
    return blog;
  } catch (error) {}
}

export const DashboardEdit = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const blog: FullBlog = loaderData;

  if (!blog) return <Container py="xl">Blog not found</Container>;

  const handleSubmit = (status: BlogStatus) => {
    // Submit the form programmatically
    const form = document.getElementById("edit-blog-form") as HTMLFormElement;
    const formData = new FormData(form);
    formData.set("status", status);
    // submit(formData, { method: "post", action: `/dashboard/edit/${blog.id}` });
  };

  return (
    <Container size="md" py="xl">
      <Button variant="outline" mb="md" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Title order={2} mb="md">
        Edit Blog
      </Title>

      <Form id="edit-blog-form">
        <Stack gap="md">
          {blog.imageUrl && (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              height={250}
              radius="md"
            />
          )}

          <TextInput
            label="Title"
            name="title"
            defaultValue={blog.title}
            required
          />

          <Textarea
            label="Content"
            name="content"
            defaultValue={blog.content}
            minRows={6}
            required
          />

          <TextInput
            label="Image URL"
            name="imageUrl"
            defaultValue={blog.imageUrl ?? ""}
          />

          <Select
            label="Status"
            name="status"
            data={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ]}
            defaultValue={blog.status}
          />

          <Group gap="sm">
            <Button
              color="gray"
              variant="outline"
              onClick={() => handleSubmit("draft")}
            >
              Save Draft
            </Button>
            <Button color="green" onClick={() => handleSubmit("published")}>
              Publish
            </Button>
          </Group>
        </Stack>
      </Form>
    </Container>
  );
};

export default DashboardEdit;
