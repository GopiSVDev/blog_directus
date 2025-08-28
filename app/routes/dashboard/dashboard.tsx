import {
  Table,
  Button,
  Group,
  Text,
  Badge,
  Stack,
  Container,
} from "@mantine/core";
import { Link, redirect, useNavigate } from "react-router";
import { fetchUserBlogs } from "~/.server/blogs";
import type { Route } from "../+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const userBlogs = await fetchUserBlogs(request);
    return userBlogs;
  } catch (error) {
    console.error("Failed to fetch user blogs:", error);
    return redirect("/");
  }
}

export const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const blogs = loaderData;

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Text size="xl" ta="center" fw={600}>
          Your Blogs
        </Text>

        {blogs.length === 0 && (
          <Text c="dimmed" ta="center">
            No blogs created yet.
          </Text>
        )}

        {blogs.length > 0 && (
          <Table highlightOnHover verticalSpacing="sm" striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {blogs.map((blog) => (
                <Table.Tr key={blog.id}>
                  <Table.Td>{blog.title}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={blog.status === "published" ? "green" : "gray"}
                      variant="light"
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    {new Date(blog.date_created).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>
                    <Group gap="xs">
                      <Link to={`/dashboard/edit/${blog.id}`}>
                        <Button size="xs" variant="outline">
                          Edit
                        </Button>
                      </Link>

                      <Button size="xs" color="red" variant="outline">
                        Delete
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Stack>
    </Container>
  );
};

export default Dashboard;
