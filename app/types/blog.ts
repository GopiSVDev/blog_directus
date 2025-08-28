export interface BlogPost {
  imageUrl: string;
  title: string;
  content: string;
  author: string;
  status: BlogStatus;
}

export interface FullBlog extends BlogPost {
  id: number;
  date_created: string;
}

type BlogStatus = "draft" | "published";

export const blogs: FullBlog[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/id/1015/800/400",
    title: "Exploring the Hidden Gems of Kyoto",
    content: `
Kyoto is a city that blends ancient tradition with modern life seamlessly. 
From the serene bamboo forests of Arashiyama to the quiet temples tucked away in small alleys, 
there’s a unique experience around every corner. While many tourists flock to Kinkaku-ji or Fushimi Inari, 
exploring lesser-known shrines and local street markets offers a more authentic taste of the city. 
During your visit, be sure to try matcha tea at a small local teahouse and wander through the Gion district in the early morning to catch the city at its calmest. 
Kyoto’s charm is in its details and the slow pace that allows visitors to truly appreciate its beauty.
    `,
    author: "Hannah Lee",
    status: "published",
    date_created: "2025-01-12",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/id/1016/800/400",
    title: "Why TypeScript Makes React Development Easier",
    content: `
TypeScript has rapidly become a favorite among React developers, and for good reason. 
By providing static typing, developers can catch bugs before they even run their code, 
making the development process more predictable and maintainable. In large-scale projects, 
TypeScript enforces better structure, helps with code readability, and improves IDE support with intelligent autocompletion and type checking. 
Whether you are creating complex forms or building scalable component libraries, TypeScript helps reduce runtime errors and improves the overall developer experience, leading to more robust React applications.
    `,
    author: "Marcus Brown",
    status: "draft",
    date_created: "2025-02-04",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/id/1025/800/400",
    title: "The Rise of Electric Cars in 2025",
    content: `
Electric vehicles (EVs) have come a long way in the past decade. With advancements in battery technology, charging infrastructure, and government incentives, EVs are now more accessible than ever. 
Major manufacturers are releasing electric models across all segments, from compact cars to SUVs. 
EV adoption is not just about environmental benefits—it also changes the way cities think about energy, transport, and sustainability. 
For consumers, the lower long-term maintenance costs, smoother driving experience, and expanding charging networks make electric cars an increasingly attractive option. 
The coming years will define whether EVs become the dominant mode of transportation or remain a niche choice.
    `,
    author: "Sophia Martinez",
    status: "published",
    date_created: "2025-02-21",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/id/1031/800/400",
    title: "Mastering Minimalist Home Design",
    content: `
Minimalist home design is more than a trend; it’s a lifestyle choice. 
The philosophy revolves around decluttering, focusing on functionality, and creating spaces that promote calm and clarity. 
A minimalist home emphasizes quality over quantity, incorporating furniture and décor that serve a purpose while maintaining a sense of openness. 
Neutral tones, natural materials, and smart storage solutions are key components of minimalist interiors. 
By removing unnecessary distractions, homeowners can create environments that feel spacious, peaceful, and intentional, allowing daily life to become more harmonious.
    `,
    author: "Liam Chen",
    status: "draft",
    date_created: "2025-03-05",
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/id/1043/800/400",
    title: "Top 10 Hiking Trails in the US",
    content: `
The United States is home to some of the world’s most stunning hiking trails. 
From the Appalachian Trail on the East Coast to the rugged paths of the Pacific Northwest, hikers of all levels can find something to challenge and inspire them. 
Highlights include the breathtaking vistas along the Grand Canyon Rim, the alpine lakes of the Rocky Mountains, and the coastal paths of California’s Big Sur. 
Each trail offers unique scenery, wildlife, and opportunities for adventure. 
Proper preparation, including checking trail conditions and packing essential gear, ensures a safe and enjoyable hiking experience.
    `,
    author: "Emily Johnson",
    status: "published",
    date_created: "2025-03-14",
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/id/1052/800/400",
    title: "A Beginner’s Guide to Investing in 2025",
    content: `
Investing can be intimidating for first-timers, but understanding the basics is the first step to financial independence. 
Begin by learning about stocks, bonds, ETFs, and mutual funds, as well as the concept of diversification to reduce risk. 
Modern investing platforms make it easier to start small and gradually increase exposure. 
It’s important to have clear goals, whether saving for retirement, buying a home, or building wealth over time. 
By creating a strategy and staying informed, even beginners can confidently navigate the investment landscape and make decisions that align with their long-term financial plans.
    `,
    author: "David Kim",
    status: "published",
    date_created: "2025-03-30",
  },
  {
    id: 7,
    imageUrl: "https://picsum.photos/id/1062/800/400",
    title: "Cooking with Seasonal Ingredients",
    content: `
Eating with the seasons is both healthier and more sustainable. 
Seasonal ingredients are fresher, tastier, and often more affordable. 
By adapting recipes to what’s currently in season, cooks can explore a wide variety of flavors and textures throughout the year. 
Farmers’ markets and local produce shops are excellent places to discover unique fruits, vegetables, and herbs. 
Seasonal cooking encourages creativity in the kitchen, reduces reliance on imported products, and connects people to the natural rhythms of the environment.
    `,
    author: "Olivia Garcia",
    status: "draft",
    date_created: "2025-04-10",
  },
  {
    id: 8,
    imageUrl: "https://picsum.photos/id/1074/800/400",
    title: "The Future of Remote Work",
    content: `
Remote work has transformed the modern workplace, offering flexibility and work-life balance to millions of employees worldwide. 
Companies are now adopting hybrid models, digital nomad programs, and fully remote positions to attract top talent. 
While remote work offers freedom, it also presents challenges, including maintaining collaboration, productivity, and team culture. 
Technology, communication tools, and clear policies help bridge these gaps. 
As remote work continues to evolve, organizations and employees alike are learning how to optimize this new way of working for efficiency and well-being.
    `,
    author: "James Wilson",
    status: "published",
    date_created: "2025-04-22",
  },
  {
    id: 9,
    imageUrl: "https://picsum.photos/id/1084/800/400",
    title: "Mindfulness for Busy Professionals",
    content: `
In today’s fast-paced world, mindfulness offers a way to reduce stress and increase focus. 
By incorporating short meditation sessions, mindful breathing, or focused reflection into daily routines, professionals can improve productivity and mental health. 
Mindfulness helps individuals stay present, reduce anxiety, and make more thoughtful decisions. 
Even small practices, such as taking a few deep breaths before meetings or keeping a gratitude journal, can have a meaningful impact. 
Adopting mindfulness techniques allows busy professionals to create balance amidst the demands of work and life.
    `,
    author: "Ava Patel",
    status: "published",
    date_created: "2025-05-03",
  },
  {
    id: 10,
    imageUrl: "https://picsum.photos/id/1092/800/400",
    title: "Building Scalable APIs with Node.js",
    content: `
Node.js provides a powerful platform for building scalable and efficient APIs. 
With its non-blocking I/O and event-driven architecture, Node.js handles high volumes of requests with minimal resource usage. 
Best practices include organizing code with modular structure, implementing proper error handling, and using tools like Express.js for routing. 
Monitoring, logging, and load testing ensure APIs remain performant under pressure. 
By combining these strategies, developers can create APIs that are reliable, maintainable, and ready to support growing applications and user bases.
    `,
    author: "Ethan Rogers",
    status: "draft",
    date_created: "2025-05-19",
  },
];
