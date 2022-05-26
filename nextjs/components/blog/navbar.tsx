import React from "react";
import { FlexBox } from "../../styles/containers";
import { Post } from "./types";
import { Control } from "../../styles/buttons";
import { useRouter } from "next/router";
import { RootState } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../state/actiontypes";
import { toASCII } from "punycode";
import Tags from "./tags/manageTags";

export const NavBar = ({ posts }: { posts: Post[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedTags = useSelector(
    (state: RootState) => state.blog.selectedTags
  );
  const setSelectedTags = (tagName: string) => {
    let tags = [...selectedTags, ...[tagName]];
    if (selectedTags.includes(tagName)) {
      tags = selectedTags.filter((t: string) => t !== tagName);
    }
    if (tags.length === 0) {
      dispatch({ type: blogActions.SET_SELECTED_TAGS, tags: [] });
      return router.push("/blog");
    }
    router.push(`/blog/tag/${tags.join("&")}`);
  };
  return (
    <FlexBox column>
      <FlexBox column gapSize="small">
        <h3>posts</h3>
        {posts.map((p) => (
          <Control onClick={() => router.push(`/blog/post/${p.title}`)}>
            {p.title?.replace(/_/g, " ")}
          </Control>
        ))}
      </FlexBox>
      <FlexBox column gapSize="small">
        <h3>tags</h3>
        {posts.map(
          (p) =>
            p.tags &&
            p.tags.map((t) => (
              <Control
                active={selectedTags?.includes(t.name)}
                onClick={() => setSelectedTags(t.name)}
                key={`tag-${t.name}`}
              >
                {t.name.replace(/_/g, " ")}
              </Control>
            ))
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default NavBar;
