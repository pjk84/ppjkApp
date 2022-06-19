import React from "react";
import { FlexBox } from "../../styles/containers";
import { Post } from "./types";
import { Title } from "./Title";
import Controls from "./MessageControls";
import { PostBlock } from "../../styles/blog";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

const PostHeader = ({ post, focused }: { post: Post; focused?: boolean }) => {
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);
  return (
    <FlexBox align="center" justify="between">
      <div style={{ opacity: 0.5 }}>
        <div>{post.created_at}</div>
        <div>{post.author}</div>
      </div>
      {loggedIn && focused && <Controls post={post} />}
    </FlexBox>
  );
};

export default PostHeader;
