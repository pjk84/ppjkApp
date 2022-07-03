import { FlexBox } from "../../styles/containers";
import { LoaderWrapper, PostWrapper, PostBlock } from "../../styles/blog";

import { Control } from "../../styles/buttons";
import TextEditor from "./editor";
import { useDispatch, useSelector } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import { RootState } from "../../state";
import { Warning } from "../../styles/notifications";
import Loader from "../Loaders";
import apiClient from "../../api/client";
import { Title } from "./Title";
import Tags from "./tags/manageTags";
import { useRouter } from "next/router";

const NewPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const draft = useSelector((state: RootState) => state.blog.draft);
  const warnings = useSelector((state: RootState) => state.blog.warning);
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

  const backToList = () => {
    dispatch({ type: blogActions.RELOAD_REQUIRED });
    router.push("/blog");
  };

  const submitPost = async () => {
    let err: string[] = [];
    try {
      if (!draft?.title) {
        err.push("no title");
      }
      if (!draft?.body) {
        err.push("no content");
      }
      if (err.length > 0) {
        throw Error(err.join(","));
      }
      await apiClient().addBlogMessage(draft);
      backToList();
    } catch (err) {
      dispatch({
        type: actions.SET_WARNING,
        message: (err as Error).message.split(","),
      });
    }
  };

  return (
    <>
      {warnings && (
        <FlexBox gapSize="small">
          {warnings.map((w: string) => (
            <Warning key={`warning-${w}`}>{w}</Warning>
          ))}
        </FlexBox>
      )}
      <PostWrapper type={"new"} key={`textBox-new-post`}>
        <FlexBox column gapSize="small">
          Title:
          <PostBlock border>
            {" "}
            <Title title={draft?.title} newPost={true} />
          </PostBlock>
        </FlexBox>
        <FlexBox column gapSize="small">
          Tags:
          <PostBlock border>
            <Tags />
          </PostBlock>
        </FlexBox>

        <FlexBox column gapSize="small">
          Body:
          <PostBlock border>
            <TextEditor />
            <FlexBox justify="center" gapSize="large">
              <Control onClick={submitPost}>submit</Control>
              <Control onClick={backToList}>cancel</Control>
            </FlexBox>
          </PostBlock>
        </FlexBox>
      </PostWrapper>
    </>
  );
};

export default NewPost;
