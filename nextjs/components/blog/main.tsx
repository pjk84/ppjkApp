import React, { useState } from "react";
import { BlogWrapper } from "../../styles/blog";
import { LoaderWrapper } from "../../styles/blog";
import { BlogPost } from ".";
import { Post } from "./types";
import { useSelector, useDispatch, batch } from "react-redux";
import { RootState } from "../../state";
import { actions, blogActions } from "../../state/actiontypes";
import apiClient from "../../pages/api/client";
import { Control } from "../../styles/buttons";
import { useRouter } from "next/router";
import Loader from "../Loaders";
import NavBar from "./navbar";

export const Wrapper = ({
  child,
  controls,
}: {
  child: any;
  controls: any[];
}) => {
  return (
    <BlogWrapper key={`blogpost-wrapper`}>
      {controls.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
      {child}
    </BlogWrapper>
  );
};

const Blog = ({ tags }: { tags: string[] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let posts: Post[] = useSelector((state: RootState) => state.blog.posts);

  const reload = useSelector((state: RootState) => state.blog.reload);
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);
  const focus = useSelector((state: RootState) => state.main.focus);
  React.useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const posts = await apiClient().fetchBlogMessages();
      batch(() => {
        dispatch({ type: blogActions.SET_POSTS, posts, activePost: undefined });
      });
    };
    if (posts?.length === 0 || reload) {
      fetchMessages();
      setLoading(false);
      return;
    }
    if (focus !== "blog") dispatch({ type: actions.SET_FOCUS, focus: "blog" });
  }, [setLoading, focus, posts, dispatch]);
  if (!posts) {
    return (
      <LoaderWrapper>
        <Loader type={"dots"} text={"loading posts"} />
      </LoaderWrapper>
    );
  }
  if (posts.length === 0) {
    return null;
  }

  let elems = [...posts];
  if (tags.length > 0) {
    elems = elems.filter((p) => p.tags?.some((pt) => tags.includes(pt.name)));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
      <NavBar posts={posts} />
      <Wrapper
        controls={[
          <Control
            key="add_new_post"
            onClick={() => router.push("/blog/post/new_post")}
          >
            add new post
          </Control>,
        ]}
        child={
          <>
            {elems.map((post: Post) => (
              <BlogPost
                focused={false}
                key={`blogPost-${post.id}`}
                post={post}
              />
            ))}
          </>
        }
      />
    </div>
  );
};

export default Blog;
