import styled from "styled-components";
import { FlexBox } from "./containers";

export const MessageBodyPreview = styled.p`
  margin: 0px;
  padding: 0px;
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

export const PostWrapper = styled.span<{
  type?: "new" | "editing" | "deleting" | "thread";
}>`
  position: relative;
  display: flex;
  gap: ${(p) => p.type === "new" && "20px"};
  color: ${(p) => p.theme.textColor};
  flex-direction: column;
  justify-content: flex-start;
  border: ${(p) => p.type !== "thread" && "1px solid"};
  border-color: ${(p) =>
    p.type === "deleting"
      ? p.theme.red
      : p.type === "editing"
      ? p.theme.blue
      : p.type === "new"
      ? "transparent"
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

export const PostBlock = styled.span<{ border?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.posts.backgroundColor};
  padding: 20px;
  color: ${(p) => p.theme.textColor};
  border: ${(p) => p.border && "1px solid"};
  border-color: ${(p) => p.theme.posts.borderColor};
`;

export const BlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Tag = styled.div`
  padding: 5px;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.tag.backgroundColor};
`;

export const LoaderWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 200px;
`;

export const TagBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;
