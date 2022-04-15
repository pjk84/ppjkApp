import React, { useState } from "react";
import { FlexBox, FlexBoxCentered } from "../styles/containers";
import { BlogWrapper } from "../styles/blog";
import { BlogPost } from "../components/blog";
import { Post } from "../components/blog/types";
import { useSelector, useDispatch, batch } from "react-redux";
import { RootState } from "../state";
import { actions, blogActions } from "../state/actiontypes";
import NewPost from "../components/blog/NewPost";
import apiClient, { Framework } from "../pages/api/client";
import { Control } from "../styles/buttons";
import { useRouter } from "next/router";
import Loader from "../components/Loaders";

export const Wrapper = ({
  child,
  controls,
}: {
  child: any;
  controls: any[];
}) => {
  return (
    <div
      key={`blogpost-wrapper`}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {controls.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
      {child}
    </div>
  );
};

const Blog = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const posts = useSelector((state: RootState) => state.blog.posts);
  const activePost = useSelector((state: RootState) => state.blog.activePost);
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);
  const focus = useSelector((state: RootState) => state.main.focus);
  React.useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const posts = await apiClient().fetchBlogMessages();
      batch(() => {
        dispatch({ type: blogActions.SET_POSTS, posts });
        dispatch({ type: blogActions.SET_ACTIVE_POST, title: null });
      });
    };
    if (!posts || activePost) {
      console.log("getting posts");
      fetchMessages();
      setLoading(false);
      return;
    }

    if (focus !== "blog") dispatch({ type: actions.SET_FOCUS, focus: "blog" });
  }, [setLoading, activePost, focus, posts, dispatch]);
  if (!posts) {
    return (
      <FlexBoxCentered style={{ minHeight: 200 }}>
        <Loader type={"dots"} text={"loading posts"} />
      </FlexBoxCentered>
    );
  }

  return (
    <Wrapper
      controls={[
        <Control
          key="add_new_post"
          onClick={() => router.push("/blog/new_post")}
        >
          add new post
        </Control>,
      ]}
      child={
        <BlogWrapper>
          {posts?.map((post: Post) => (
            <BlogPost focused={false} key={`blogPost-${post.id}`} post={post} />
          ))}
        </BlogWrapper>
      }
    />
  );
};

export default Blog;
