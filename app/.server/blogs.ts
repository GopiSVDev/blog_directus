import { readItem, readItems } from "@directus/sdk";
import { client } from "./directus";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
}

export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const res = (await client.request(readItems("blogs"))) as Blog[];
    return res;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  try {
    const res = (await client.request(readItem("blogs", id))) as Blog;
    return res;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return undefined;
  }
};
