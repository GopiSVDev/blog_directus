export interface BlogPost {
  imageUrl?: string;
  title: string;
  content: string;
  status: BlogStatus;
}

export interface FullBlog extends BlogPost {
  author: string;
  id: number;
  date_created: string;
}

export type BlogStatus = "draft" | "published";
