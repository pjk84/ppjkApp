import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../state";
import { BlogPost } from "../../../components/blog";
import { Post } from "../../../components/blog/types";
import apiClient from "../../../api/client";
import { actions, blogActions } from "../../../state/actiontypes";
import { NewPost } from "../../../components/blog";
import { Control } from "../../../styles/buttons";
import { Wrapper } from "../../../components/blog/main";
import { FlexBox } from "../../../styles/containers";
import Thread from "../../../components/blog/Thread";
import Link from "next/link";

const PostByTitle = () => {
  const dispatch = useDispatch();

  let post: Post = useSelector((state: RootState) => state.blog.focussedPost);
  let posts: Post[] = useSelector((state: RootState) => state.blog.posts);
  const router = useRouter();
  const { title } = router.query;
  useEffect(() => {
    if (!title) return; // no point doing anything without title
    async function getPostByTitle(postTitle: string) {
      return await apiClient().getBlogMessageByTitle(postTitle);
    }
    async function getReplies(parentId: string) {
      // return await apiClient().getBlogRepliesByParentId(parentId);
    }
    if (title === "new_post") {
      dispatch({ type: actions.SET_FOCUS, focus: "blog" });
      return;
    }

    if (!post) {
      const p = posts.find((p) => p.title === title);
      if (p) {
        // post already fetched
        getReplies(p.id)
          .then((replies) =>
            batch(() => {
              dispatch({
                type: blogActions.FOCUS_POST,
                post: { ...p, replies },
              });
            })
          )
          .catch((err) => console.log(err));

        return;
      }
      getPostByTitle(title as string)
        .then((post: Post) => {
          if (post) {
            getReplies(post.id)
              .then((replies) =>
                batch(() => {
                  dispatch({
                    type: blogActions.FOCUS_POST,
                    post: { ...post, replies },
                  });
                  dispatch({
                    type: blogActions.SET_ACTIVE_POST,
                    title,
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

  if (!post) return null;

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
          {
            id: "dd",
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            created_at: "a",
            author: "jimmy",
            replies: [
              {
                id: "ddd",
                body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                created_at: "a",
                author: "bob",
              },
            ],
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

  if (post.title === "thread") {
    post = mock; //todo: delete
  }

  return (
    <Wrapper
      controls={[
        <Link href="/blog">
          <Control key="back_to_posts">back to all posts</Control>
        </Link>,
      ]}
      child={
        post.replies ? (
          <Thread post={post} />
        ) : (
          <BlogPost key={`blogPost-${post.id}`} post={post} focused={true} />
        )
      }
    />
  );
};

export default PostByTitle;
