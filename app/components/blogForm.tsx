import {
  Alert,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Form } from "react-router";
import type { FullBlog } from "~/types/blog";

type BlogFormProps = {
  blog?: FullBlog;
  error?: string;
};

const BlogForm = ({ blog, error }: BlogFormProps) => {
  return (
    <Container size="md" py="xl">
      <Form method="post">
        <Stack gap="md">
          {error && (
            <Alert color="red" mb="md" radius="md" variant="light">
              {error}
            </Alert>
          )}
          {blog?.imageUrl && (
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
            defaultValue={blog?.title ?? ""}
            required
          />

          <Textarea
            label="Content"
            name="content"
            defaultValue={blog?.content ?? ""}
            maxRows={6}
            autosize
            required
          />

          <TextInput
            label="Image URL"
            name="imageUrl"
            type="url"
            defaultValue={blog?.imageUrl ?? ""}
          />

          {blog && (
            <Text>
              <strong>Status:</strong>{" "}
              {blog.status === "published" ? "Published" : "Draft"}
            </Text>
          )}

          <Group gap="sm">
            <Button
              type="submit"
              name="submit"
              value="draft"
              color="gray"
              variant="outline"
            >
              Save Draft
            </Button>
            <Button type="submit" name="submit" value="publish" color="green">
              Publish
            </Button>
          </Group>
        </Stack>
      </Form>
    </Container>
  );
};

export default BlogForm;
