import {
  AspectRatio,
  Avatar,
  Badge,
  Card,
  CardSection,
  Center,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { Link } from "react-router";
import type { FullBlog } from "~/types/blog";
import { RxAvatar } from "react-icons/rx";

const BlogItem = ({ blog }: { blog: FullBlog }) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        radius="md"
        shadow="lg"
        w="100%"
        maw="384px"
        mah="580px"
        mih="530px"
      >
        <CardSection>
          <AspectRatio ratio={2 / 1}>
            <Image
              maw="384px"
              h="192px"
              src={
                blog.imageUrl ||
                "https://placehold.co/800x400?text=No+Image+Available"
              }
              alt="Image Not Available"
            />
          </AspectRatio>
        </CardSection>

        <Badge
          variant="light"
          my="sm"
          color={blog.status === "published" ? "green" : "gray"}
        >
          {blog.status === "published" ? "Published" : "Draft"}
        </Badge>

        <Text my="sm" fw={600}>
          {blog.title}
        </Text>

        <Text fz="sm" c="dimmed" lineClamp={6}>
          {blog.content}
        </Text>

        <Group mt="auto">
          <Center>
            <Avatar size={40} radius="xl" mr="xs">
              <RxAvatar />
            </Avatar>
            <div>
              <Text fw={500}>
                By {"{"} Author Name {"}"}
              </Text>
              <Text fz="xs" c="gray">
                {new Date(blog.date_created).toLocaleDateString()}
              </Text>
            </div>
          </Center>
        </Group>
      </Card>
    </Link>
  );
};

export default BlogItem;
