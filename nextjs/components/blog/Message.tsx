import { FlexBox, TitleBar } from "../../styles/containers";
import {
  PostWrapper,
  MessageBodyPreview,
  BlogPostBody,
  Tag,
} from "../../styles/blog";
import Title from "./Title";
import TextEditor from "./editor";
import { Post, PostProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import { RootState } from "../../state";
import ReactHtmlParser from "react-html-parser";
import Loader from "../Loaders";
import Controls from "./MessageControls";
import PostHeader from "../../components/blog/PostHeader";

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
    <BlogPostBody>{asHtml}</BlogPostBody>
  ) : (
    <MessageBodyPreview>{asHtml[0].props.children[0]}</MessageBodyPreview>
  );
};

export const ThreadItem = ({ post }: { post: Post }) => {
  return (
    <PostWrapper type={"thread"}>
      <PostHeader post={post} />
      {textBody(post.body, true)}
    </PostWrapper>
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
      <PostWrapper type={"editing"}>
        <Loader type="dots" text="updating message"></Loader>
      </PostWrapper>
    );
  }

  const tags = [
    { id: "abc", title: "things" },
    { id: "abc", title: "stuff" },
  ];
  return (
    <PostWrapper
      type={
        editDraft?.id === post.id
          ? "editing"
          : deleting
          ? "deleting"
          : undefined
      }
      key={`textBox-${post.id}`}
    >
      <PostHeader loggedIn={loggedIn} focused={focused} post={post} />
      <BlogPostBody>
        {editDraft?.id === post.id ? (
          <TextEditor post={post} isEditing={true} />
        ) : (
          textBody(post.body, focused)
        )}
        <FlexBox gapSize="small">
          {tags.map((tag) => (
            <Tag key={tag.id}>{tag.title}</Tag>
          ))}
        </FlexBox>
      </BlogPostBody>
    </PostWrapper>
  );
};

export default BlogPost;
