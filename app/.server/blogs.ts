import { authClient, client } from "./directus";
import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  readMe,
  updateItem,
} from "@directus/sdk";
import { getUserSession } from "./session";
import type { BlogPost, FullBlog } from "~/types/blog";

// Public - No Auth Functions

export async function fetchAllBlogs() {
  try {
    const res = await client.request(
      readItems("blogs", { filter: { status: { _eq: "published" } } })
    );

    return res as FullBlog[] | [];
  } catch (err) {
    console.error("Failed to fetch blogs", err);
    throw new Error("An error occurred while fetching blogs.");
  }
}

export async function getBlogById(id: number) {
  try {
    const res = await client.request(
      readItem("blogs", id, { filter: { status: { _eq: "published" } } })
    );

    return res as FullBlog;
  } catch (err) {
    console.error(`Failed to fetch blogs with ID ${id}`, err);
    throw new Error("An error occurred while fetching the blogs.");
  }
}

// Authenticated Functions

async function getAccessToken(request: Request) {
  const { session } = await getUserSession(request);
  if (!session) throw new Error("Not logged in");

  const accessToken = session.get("accessToken");
  if (!accessToken) throw new Error("Not logged in");

  authClient.setToken(accessToken);
  return accessToken;
}

async function getCurrentUser() {
  try {
    return await authClient.request(readMe());
  } catch (err) {
    throw new Error("Failed to fetch current user.");
  }
}

export async function fetchUserBlogs(request: Request) {
  await getAccessToken(request);

  const currentUser = await getCurrentUser();
  try {
    const res = await authClient.request(
      readItems("blogs", { filter: { author: { _eq: currentUser.id } } })
    );

    return res;
  } catch (err) {
    console.error("Failed to fetch blogs", err);
    throw new Error("An error occurred while fetching blogs.");
  }
}

export async function fetchUserBlogById(id: number, request: Request) {
  await getAccessToken(request);
  const currentUser = await getCurrentUser();

  try {
    const res = await authClient.request(
      readItem("blogs", id, { filter: { author: { _eq: currentUser.id } } })
    );

    return res as FullBlog;
  } catch (err) {
    console.error(`Failed to fetch blogs with ID ${id}`, err);
    throw new Error("An error occurred while fetching the blogs.");
  }
}

export async function createBlog(blog: BlogPost, request: Request) {
  await getAccessToken(request);
  const currentUser = await getCurrentUser();

  try {
    await authClient.request(
      createItem("blogs", { ...blog, author: currentUser.id })
    );
  } catch (err) {
    console.error("Failed to create blogs", err);
    throw new Error("An error occurred while creating the blogs.");
  }
}

export async function updateBlog(
  id: number,
  updatedBlog: Partial<BlogPost>,
  request: Request
) {
  await getAccessToken(request);
  try {
    await authClient.request(updateItem("blogs", id, updatedBlog));
  } catch (err) {
    console.error("Failed to update blog", err);
    throw new Error("An error occurred while updating the blog.");
  }
}

export async function deleteBlog(id: number, request: Request) {
  await getAccessToken(request);
  try {
    await authClient.request(deleteItem("blogs", id));
  } catch (err) {
    console.error("Failed to delete blog", err);
    throw new Error("An error occurred while deleting the blog.");
  }
}
