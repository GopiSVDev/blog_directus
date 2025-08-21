import { Text } from "@mantine/core";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog App" },
    { name: "description", content: "Create or View Blogs" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>All Published Blogs</h1>
    </div>
  );
}
