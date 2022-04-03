import React from "react";
import { RootState } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import apiClient from "../../pages/api/client";
import { Control } from "../../styles/buttons";
import { FlexBox } from "../../styles/containers";
import { useRouter } from "next/router";
import { Post } from "./types";

const Controls = ({ message }: { message: Post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const editDraft = useSelector((state: RootState) => state.blog.draft);
  const deleting = useSelector(
    (state: RootState) => state.blog.deletingPost === message.id
  );

  const deletePost = async () => {
    await apiClient().deleteBlogMessages(message.id);
    dispatch({ type: actions.DELETE_POST, id: message.id });
    router.push("/blog");
  };

  if (deleting) {
    return (
      <FlexBox justify="center" gapSize="large">
        <Control onClick={deletePost} color="red">
          delete now
        </Control>
        <Control
          color="gray"
          onClick={() => dispatch({ type: actions.IS_DELETING, id: null })}
        >
          cancel
        </Control>
      </FlexBox>
    );
  }

  if (editDraft) {
    const submitEdit = async () => {
      try {
        dispatch({
          type: actions.SET_LOADER,
          action: blogActions.UPDATING_BLOG_POST,
        });
        await apiClient().editBlogMessage({
          id: editDraft.id,
          body: editDraft.body,
        } as Post);
        // re-fetch the updated message
        const updated = await apiClient().getBlogMessageByTitle(
          editDraft.title
        );
        dispatch({
          type: blogActions.SET_DRAFT,
          draft: null,
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
          dispatch({ type: blogActions.SET_DRAFT, draft: message })
        }
      >
        edit
      </Control>
      <Control
        onClick={() => dispatch({ type: actions.IS_DELETING, id: message.id })}
      >
        delete
      </Control>
    </FlexBox>
  );
};

export default Controls;
