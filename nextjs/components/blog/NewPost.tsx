import { FlexBox } from "../../styles/containers";
import {
  BlogPostBody,
  BlogPostHeader,
  LoaderWrapper,
  PostWrapper,
} from "../../styles/blog";

import { Control } from "../../styles/buttons";
import TextEditor from "./editor";
import { useDispatch, useSelector } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import { RootState } from "../../state";
import { Warning } from "../../styles/notifications";
import Loader from "../Loaders";
import { useState } from "react";
import apiClient, { Framework } from "../../api/client";
import { Post } from "./types";
import { Title } from "./Title";
import Tags from "./tags/manageTags";
import { useRouter } from "next/router";

const NewPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const draft = useSelector((state: RootState) => state.blog.draft);
  const warning = useSelector((state: RootState) => state.blog.warning);
  const isPosting = useSelector(
    (state: RootState) => state.blog.loader === "posting"
  );

  if (isPosting) {
    return (
      <LoaderWrapper key={`textBox-new-post`}>
        <Loader type="dots" text="posting message" />
      </LoaderWrapper>
    );
  }

  const cancel = () => {
    dispatch({ type: blogActions.SET_DRAFT, draft: null });
    router.push("/blog");
  };

  const submitPost = async () => {
    if (!draft.title) {
      dispatch({
        type: actions.SET_WARNING,
        message: "Please add a title",
      });
      return;
    }
    if (!draft.body) {
      dispatch({
        type: actions.SET_WARNING,
        message: "Please add a message",
      });
      return;
    }
    try {
      await apiClient().addBlogMessage(draft);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: blogActions.RELOAD_REQUIRED });
      router.push("/blog");
    }
  };

  return (
    <PostWrapper type={"new"} key={`textBox-new-post`}>
      <BlogPostHeader>
        {warning && <Warning>{warning}</Warning>}
        <Title title={draft?.title} isEditing={true} />
      </BlogPostHeader>
      <BlogPostBody>
        <TextEditor />
        <Tags />
        <FlexBox justify="center" gapSize="large">
          <Control onClick={submitPost}>submit</Control>
          <Control onClick={cancel}>cancel</Control>
        </FlexBox>
      </BlogPostBody>
    </PostWrapper>
  );
};

export default NewPost;
