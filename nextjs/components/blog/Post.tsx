import { FlexBox, TitleBar } from "../../styles/containers";
import {
  PostWrapper,
  MessageBodyPreview,
  Tag,
  PostBlock,
  TagBox,
} from "../../styles/blog";
import Title from "./Title";
import TextEditor from "./editor";
import { Post, PostProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { actions, blogActions } from "../../state/actiontypes";
import { RootState } from "../../state";
import ReactHtmlParser from "react-html-parser";
import Loader from "../Loaders";
import PostHeader from "./PostHeader";

const textBody = (text: string, focused?: boolean) => {
  // draft js does not wrap code in code tag. //todo: find better solution
  text = text
    .replace("<pre>", "<pre class=codeBlock><code><span>")
    .replace("</pre>", "</span></code></pre>");
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
      <PostBlock>{textBody(post.body, true)}</PostBlock>
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

  const tags = post.tags.length > 0 && (
    <TagBox>
      {post.tags.map((tag) => (
        <Tag key={tag.id}>{tag.name.replace(/_/g, " ")}</Tag>
      ))}
    </TagBox>
  );

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
      <PostBlock>
        {focused && tags}
        <Title title={post.title} clickable={true} />
        {draft?.id === post.id ? <TextEditor /> : textBody(post.body, focused)}
        {!focused && tags}
        <PostHeader focused={focused} post={post} />
      </PostBlock>
    </PostWrapper>
  );
};

export default BlogPost;
