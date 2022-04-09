import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../state";
import { BlogPost } from "../../components/blog";
import { Post } from "../../components/blog/types";
import apiClient from "../api/client";
import { actions, blogActions } from "../../state/actiontypes";
import { NewPost } from "../../components/blog";
import { Control } from "../../styles/buttons";
import { Wrapper } from "../blog";
import { FlexBox } from "../../styles/containers";
import Thread from "../../components/blog/Thread";

const PostByTitle = () => {
  const dispatch = useDispatch();
  const activePost: string = useSelector(
    (state: RootState) => state.blog.activePost
  );
  const posts: Post[] = useSelector((state: RootState) => state.blog.posts);
  const router = useRouter();
  const { title } = router.query;
  useEffect(() => {
    if (!title) return; // no point doing anything without title
    async function getPostByTitle(postTitle: string) {
      return await apiClient().getBlogMessageByTitle(postTitle);
    }
    async function getReplies(parentId: string) {
      return await apiClient().getBlogRepliesByParentId(parentId);
    }

    if (!activePost) {
      console.log("get active post");
      if (title === "new_post") return; // nothing to fetch here
      getPostByTitle(title as string)
        .then((post: Post) => {
          if (post) {
            getReplies(post.id)
              .then((replies) =>
                batch(() => {
                  dispatch({
                    type: blogActions.SET_POSTS,
                    posts: [{ ...post, replies }],
                  });
                  dispatch({
                    type: blogActions.SET_ACTIVE_POST,
                    title: post.title,
                  });
                  dispatch({ type: actions.SET_FOCUS, focus: "blog" });
                })
              )
              .catch((err) => console.log(err));
          } else {
            // requested post does not exist
            router.push("/blog");
          }
        })
        .catch((e) => console.log(e));
    }
  });

  if (title === "new_post") {
    return <NewPost />;
  }

  if (!posts) return null;

  const mock: Post = {
    id: "a",
    title: "b",
    body: "original",
    created_at: "a",
    author: "a",
    replies: [
      {
        id: "b",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        created_at: "a",
        author: "lisa",
        replies: [
          {
            id: "d",
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            created_at: "a",
            author: "jimmy",
          },
        ],
      },
      {
        id: "c",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        created_at: "a",
        author: "bob",
      },
    ],
  };
  const backToPosts = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push("/blog");
    batch(() => {
      dispatch({ type: blogActions.SET_DRAFT, draft: null });
      dispatch({ type: actions.IS_DELETING, id: null });
    });
  };
  return (
    <Wrapper
      controls={[
        <Control key="back_to_posts" onClick={backToPosts}>
          back to all posts
        </Control>,
      ]}
      child={
        activePost ? (
          <Thread post={mock} />
        ) : (
          posts.map((post) => (
            <BlogPost key={`blogPost-${post.id}`} post={post} focused={false} />
          ))
        )
      }
    />
  );
};

export default PostByTitle;
