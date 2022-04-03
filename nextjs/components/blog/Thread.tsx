import React, { ReactElement } from "react";
import { Post } from "./types";
import BlogPost, { ThreadItem } from "./Message";
import { ThreadWrapper } from "../../styles/containers";

const getTree = (posts: Post[], depth: number = 0): any => {
  let node: ReactElement[] = [];
  for (const post of posts) {
    let replies;
    if (post.replies) {
      replies = getTree(post.replies, depth + 1);
    }

    node.push(
      <ThreadWrapper depth={depth * 25}>
        {post.title ? (
          <BlogPost key={`thread-post-${post.id}`} post={post} focused={true} />
        ) : (
          <ThreadItem
            key={`thread-post-${post.id}`}
            post={post}
            depth={depth}
          />
        )}
        {replies}
      </ThreadWrapper>
    );
  }
  return node;
};

const Thread = ({ post }: { post: Post }) => {
  return getTree([post]);
};

export default Thread;
