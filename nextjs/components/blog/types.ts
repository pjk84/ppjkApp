export type Post = {
  id: string;
  title?: string;
  author: string;
  body: string;
  created_at: string;
  has_replies?: boolean;
  replies?: Post[];
  tags?: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};

export type PostProps = {
  post: Post;
  focused?: boolean;
};

export type Batch = {
  messages: Array<PostProps>;
};
