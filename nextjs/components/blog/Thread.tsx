import React, { ReactElement } from "react";
import { Post } from "./types";
import BlogPost, { ThreadItem } from "./Post";
import { ThreadWrapper } from "../../styles/blog";

const getTree = (posts: Post[], depth: number = 0): any => {
  let node: ReactElement[] = [];
  for (const post of posts) {
    let replies;
    if (post.replies) {
      replies = getTree(post.replies, depth + 1);
    }

    node.push(
      <ThreadWrapper depth={depth * 25}>
        <ThreadItem key={`thread-post-${post.id}`} post={post} />
        {replies}
      </ThreadWrapper>
    );
  }
  return node;
};

const Thread = ({ post }: { post: Post }) => {
  return (
    <>
      <BlogPost key={`thread-post-${post.id}`} post={post} focused={true} />
      {post.replies && getTree(post.replies)}
    </>
  );
};

export default Thread;
