import React, { useState } from "react";
import { BlogWrapper } from "../../styles/blog";
import { LoaderWrapper } from "../../styles/blog";
import { BlogPost } from ".";
import { Post } from "./types";
import { useSelector, useDispatch, batch } from "react-redux";
import { RootState } from "../../state";
import { actions, blogActions } from "../../state/actiontypes";
import apiClient from "../../api/client";
import { Control } from "../../styles/buttons";
import { useRouter } from "next/router";
import Loader from "../Loaders";
import NavBar from "./navbar";
import {
  FlexBoxCentered,
  PostList,
  PostListItem,
} from "../../styles/containers";
import { Header1 } from "../../styles/header";
import Link from "next/link";

export const Wrapper = ({
  child,
  controls,
}: {
  child: any;
  controls?: any[];
}) => {
  return (
    <BlogWrapper key={`blogpost-wrapper`}>
      {controls && controls.map((c, i) => <div key={i}>{c}</div>)}
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
  const fetchMessages = async () => {
    setLoading(true);
    posts = await apiClient().fetchBlogMessages();
    batch(() => {
      dispatch({ type: blogActions.SET_POSTS, posts });
    });
  };
  React.useEffect(() => {
    if (reload) {
      fetchMessages().then(() => setLoading(false));
    }
    if (focus !== "blog") dispatch({ type: actions.SET_FOCUS, focus: "blog" });
  }, [setLoading, focus, posts, dispatch, reload]);
  if (loading) {
    return (
      <LoaderWrapper>
        <Loader type={"dots"} text={"loading posts"} />
      </LoaderWrapper>
    );
  }
  if (posts.length === 0) {
    return (
      <FlexBoxCentered style={{ height: "100%" }} gap={25}>
        <Header1>No posts found...</Header1>
        {loggedIn && [
          <Control
            key="add_new_post"
            onClick={() => router.push("/blog/post/new_post")}
          >
            add new post
          </Control>,
        ]}
      </FlexBoxCentered>
    );
  }

  let elems = [...posts];
  if (tags.length > 0) {
    elems = elems.filter((p) => p.tags?.some((pt) => tags.includes(pt.name)));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
      <NavBar posts={posts} />
      <Wrapper
        controls={
          loggedIn && [
            <Link href="/blog/post/new_post">
              <Control key="add_new_post">add new post</Control>
            </Link>,
          ]
        }
        child={
          <PostList>
            {elems.map((post: Post) => (
              <PostListItem key={`blogPost-${post.id}`}>
                <Link href={`/blog/post/${post.title}`}>
                  <span>
                    <BlogPost focused={false} post={post} />
                  </span>
                </Link>
              </PostListItem>
            ))}
          </PostList>
        }
      />
    </div>
  );
};

export default Blog;
