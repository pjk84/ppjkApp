import { FlexBox, MessageWrapper, TitleBar } from "../../styles/containers";

import { Control } from "../../styles/buttons";
import TextEditor from "./editor";
import { useDispatch, useSelector } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import { RootState } from "../../state";
import { Warning } from "../../styles/notifications";
import Loader from "../Loaders";
import {
  ReactElement,
  ReactEventHandler,
  ReactHTMLElement,
  useState,
} from "react";
import apiClient, { Framework } from "../../pages/api/client";
import { Post } from "./types";
import { PostTitle } from "./Message";
import { useRouter } from "next/router";

const NewPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const newPost = useSelector((state: RootState) => state.blog.addingPost);
  const title = useSelector((state: RootState) => state.blog.title);
  const warning = useSelector((state: RootState) => state.blog.warning);
  const isPosting = useSelector(
    (state: RootState) => state.blog.loader === "posting"
  );
  const [body, setTextBody] = useState<string>("");

  if (isPosting) {
    return (
      <MessageWrapper type={"new"} key={`textBox-new-post`}>
        <Loader type="dots" text="posting message" />
      </MessageWrapper>
    );
  }

  const submitPost = async () => {
    if (!title) {
      dispatch({
        type: actions.SET_WARNING,
        message: "Please add a title",
      });
      return;
    }
    if (!body) {
      dispatch({
        type: actions.SET_WARNING,
        message: "Please add a message",
      });
      return;
    }
    try {
      const client = apiClient();
      dispatch({
        type: actions.ADDING_BLOG_POST,
      });
      await apiClient().addBlogMessage({
        title: title,
        body: body,
      });
      // fetch all messages so we get the new one
      const messages = await client.fetchBlogMessages();
      dispatch({ type: blogActions.SET_POSTS, messages: messages });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: actions.SET_LOADER,
        action: null,
      });
      router.push("/blog");
    }
  };

  return (
    <MessageWrapper type={"new"} key={`textBox-new-post`}>
      {warning && <Warning>{warning}</Warning>}
      <FlexBox key={`new-post-header`} color="gray" justify="between"></FlexBox>
      <PostTitle title={title} isEditing={true} />
      <TextEditor
        getEditorStateAsHtml={(text: string) => setTextBody(text)}
        post={{ body: body || "", id: "new-post" } as Post}
      />
      <FlexBox justify="center" gapSize="large">
        <Control onClick={submitPost}>submit</Control>
        <Control onClick={() => router.push("/blog")}>cancel</Control>
      </FlexBox>
    </MessageWrapper>
  );
};

export default NewPost;
