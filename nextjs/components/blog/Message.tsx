import {
  FlexBox,
  MessageWrapper,
  MessageBodyPreview,
  TitleBar,
  Wrapper,
} from "../../styles/containers";
import Title from "./Title";
import TextEditor from "./editor";
import { Post, PostProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import { RootState } from "../../state";
import ReactHtmlParser from "react-html-parser";
import Loader from "../Loaders";
import Controls from "./MessageControls";

type ControlProps = {
  messageId: string;
};

type TitleProps = {
  title: string;
  isEditing: boolean;
};

export const PostTitle = ({ title, isEditing }: TitleProps) => {
  const dispatch = useDispatch();
  return isEditing ? (
    <TitleBar
      newMessage={!title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: actions.SET_TITLE, title: e.target.value })
      }
      defaultValue={title}
      placeholder="add title here..."
    />
  ) : (
    <Title title={title} />
  );
};

const textBody = (text: string, focused?: boolean) => {
  const asHtml = ReactHtmlParser(text);
  return focused ? (
    <div>{asHtml}</div>
  ) : (
    <MessageBodyPreview>{asHtml[0].props.children[0]}</MessageBodyPreview>
  );
};

export const ThreadItem = ({ post, depth }: { post: Post; depth: number }) => {
  return (
    <MessageWrapper type={"thread"}>
      <FlexBox
        style={{ opacity: 0.7 }}
        color="gray"
        gapSize="large"
        wrap={"true"}
      >
        <div>{post.created_at}</div>
        <div>{post.author}</div>
      </FlexBox>
      {textBody(post.body, true)}
    </MessageWrapper>
  );
};

const BlogPost = ({ post, focused }: PostProps) => {
  const editDraft: Post | null = useSelector(
    (state: RootState) => state.blog.draft
  );
  const deleting = useSelector(
    (state: RootState) => state.blog.deletingPost === post.id
  );
  const loggedIn = useSelector((state: RootState) => state.main.loggedIn);

  const isPatching =
    useSelector((state: RootState) => state.blog.loader) ===
    blogActions.UPDATING_BLOG_POST;
  if (isPatching) {
    return (
      <MessageWrapper type={"editing"}>
        <Loader type="dots" text="updating message"></Loader>
      </MessageWrapper>
    );
  }

  return (
    <MessageWrapper
      type={
        editDraft?.id === post.id
          ? "editing"
          : deleting
          ? "deleting"
          : undefined
      }
      key={`textBox-${post.id}`}
    >
      <FlexBox key={`${post.id}-header`} justify="between">
        <FlexBox
          style={{ opacity: 0.7 }}
          color="gray"
          gapSize="large"
          wrap={"true"}
        >
          <div>{post.created_at}</div>
          <div>{post.author}</div>
        </FlexBox>
        {!loggedIn && focused && <Controls message={post} />}
      </FlexBox>
      {post.title && <PostTitle isEditing={false} title={post.title} />}
      {editDraft?.id === post.id ? (
        <TextEditor post={post} isEditing={true} />
      ) : (
        textBody(post.body, focused)
      )}
    </MessageWrapper>
  );
};

export default BlogPost;
