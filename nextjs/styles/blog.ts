import styled from "styled-components";
import { FlexBox } from "./containers";

export const MessageBodyPreview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ThreadWrapper = styled.div<{ depth?: number }>`
  display: flex;
  flex-direction: column;
  margin-left: ${(p) => `${p.depth}px`};
  border-left: 1px solid;
  gap: 10px;
  padding-left: 10px;
  border-color: ${(p) => p.theme.posts.threadColor};
`;

export const PostWrapper = styled.div<{
  type?: "new" | "editing" | "deleting" | "thread";
}>`
  position: relative;
  display: flex;
  color: ${(p) => p.theme.textColor};
  flex-direction: column;
  box-shadow: ${(p) => p.type !== "thread" && p.theme.posts.boxShadow};
  background-color: ${(p) => p.theme.posts.backgroundColor};
  justify-content: flex-start;
  border: ${(p) => p.type !== "thread" && "1px solid"};
  border-color: ${(p) =>
    p.type === "deleting"
      ? p.theme.red
      : p.type === "editing"
      ? p.theme.blue
      : p.theme.posts.borderColor};
  word-wrap: break-word;
  border-radius: 8px;
  transition: all 0.2s ease-in;
  &:hover {
    .controls {
      opacity: 1;
    }
  }
`;

export const BlogPostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: ${(p) => p.theme.textColor};
`;

export const BlogPostBody = styled.span`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 0px;
`;

export const BlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Tag = styled.div`
  padding: 5px;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  background-color: red;
  background-color: ${(p) => p.theme.tag.backgroundColor};
`;

export const AddTagWrapper = styled.span`
  display: flex;
  border: 1px solid;
  border-radius: 4px;
  align-items: center;
  height: 25px;
  border-color: ${(p) => p.theme.borderColor};
  gap: 20px;
  padding: 5px;
`;

export const LoaderWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 200px;
`;
