//  let's define the types we planned here

export type NodeType =
  | "text"
  | "image"
  | "page"
  | "list"
  | "heading1"
  | "heading2"
  | "heading3";

// define node data type

export type NodeData = {
  id: string;
  type: NodeType;
  value: string;
};

// Now we define type for the Node Types

export type Page = {
  id: string;
  slug: string; // A "slug" in web development typically refers to a URL-friendly version of a string, often used in web addresses. For example, if you have a blog post titled "My Awesome Blog Post", its slug might be "my-awesome-blog-post".
  title: string;
  nodes: NodeData[]; // In a page we can have multiple nodes like link to a page or image or text ..etc
  cover: string;
};
