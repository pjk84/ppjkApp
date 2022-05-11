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
        dispatch({
          type: blogActions.SET_DRAFT,
          draft: { title: e.target.value },
        })
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

export const ThreadItem = ({ post }: { post: Post }) => {
  return (
    <PostWrapper type={"thread"}>
      <PostHeader post={post} />
      <BlogPostBody>{textBody(post.body, true)}</BlogPostBody>
    </PostWrapper>
  );
};

const BlogPost = ({ post, focused }: PostProps) => {
  const draft: Post | null = useSelector(
    (state: RootState) => state.blog.draft
  );
  const deleting = useSelector((state: RootState) => state.blog.deletingPost);

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

  return (
    <PostWrapper
      type={
        deleting
          ? "deleting"
          : draft && draft.id === post.id
          ? "editing"
          : undefined
      }
      key={`textBox-${post.id}`}
    >
      <PostHeader focused={focused} post={post} />
      <BlogPostBody>
        {draft?.id === post.id ? <TextEditor /> : textBody(post.body, focused)}
        <FlexBox gapSize="small">
          {post.tags?.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </FlexBox>
      </BlogPostBody>
    </PostWrapper>
  );
};

export default BlogPost;
