import React from "react";
import { RootState } from "../../state";
import { useSelector, useDispatch, batch } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import apiClient from "../../api/client";
import { Control } from "../../styles/buttons";
import { FlexBox } from "../../styles/containers";
import { useRouter } from "next/router";
import { Post } from "./types";

const Controls = ({ post }: { post: Post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const draft = useSelector((state: RootState) => state.blog.draft);
  const deleting = useSelector((state: RootState) => state.blog.deletingPost);

  const deletePost = async () => {
    await apiClient().deleteBlogMessages(post.id);
    batch(() => {
      dispatch({ type: blogActions.DELETE_POST, id: post.id });
    });
    router.push("/blog");
  };

  if (deleting) {
    return (
      <FlexBox justify="center" gapSize="large">
        <Control color="red" onClick={deletePost}>
          permanently delete post
        </Control>
        <Control onClick={() => dispatch({ type: blogActions.IS_DELETING })}>
          cancel
        </Control>
      </FlexBox>
    );
  }

  if (draft) {
    const submitEdit = async () => {
      try {
        dispatch({
          type: actions.SET_LOADER,
          action: blogActions.UPDATING_BLOG_POST,
        });
        await apiClient().editBlogMessage({
          id: draft.id,
          body: draft.body,
        } as Post);
        dispatch({
          type: blogActions.SET_POSTS,
          posts: [draft],
        });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({
          type: actions.SET_LOADER,
          action: null,
        });
      }
    };
    return (
      <FlexBox gapSize="large">
        <Control onClick={submitEdit}>ok</Control>
        <Control
          onClick={() => dispatch({ type: blogActions.SET_DRAFT, draft: null })}
        >
          cancel
        </Control>
      </FlexBox>
    );
  }

  return (
    <FlexBox gapSize="small">
      <Control
        onClick={() =>
          batch(() => {
            dispatch({ type: blogActions.SET_DRAFT, draft: post });
            dispatch({ type: blogActions.IS_EDITING });
          })
        }
      >
        edit
      </Control>
      <Control onClick={() => dispatch({ type: blogActions.IS_DELETING })}>
        delete
      </Control>
    </FlexBox>
  );
};

export default Controls;
