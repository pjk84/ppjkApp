import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state";
import { Control } from "../../../styles/buttons";
import { FlexBox } from "../../../styles/containers";
import { InputBorderless } from "../../../styles/input";
import { Tag as TagStyle, AddTagWrapper } from "../../../styles/blog";
import { useDispatch } from "react-redux";
import { blogActions } from "../../../state/actiontypes";
import { Tag } from "../types";
import apiClient from "../../../api/client";
import { create } from "lodash";

const Tags = () => {
  const dispatch = useDispatch();
  const tags: string[] =
    useSelector((state: RootState) => state.blog.draft?.tags) || [];
  const [tag, setTag] = useState<{
    input: string;
    isAdding: boolean;
  }>({ input: "", isAdding: false });

  const toggleAddTag = async () => {
    setTag({ ...tag, isAdding: !tag.isAdding });
  };

  const addTag = () => {
    const newTags = tag.input
      .split(",")
      .filter((t) => !tags.includes(t))
      .map((t) => t.replace(/\s/g, ""));
    dispatch({
      type: blogActions.SET_DRAFT,
      draft: { tags: [...tags, ...newTags] },
    });
    setTag({ ...tag, input: "" });
  };

  const removeTag = (tagName: string) => {
    dispatch({
      type: blogActions.SET_DRAFT,
      draft: { tags: tags.filter((t) => t !== tagName) },
    });
  };

  return (
    <FlexBox column gapSize="medium">
      <FlexBox gapSize="small" align="center">
        {!tag.isAdding && (
          <Control active={tag.isAdding} onClick={toggleAddTag}>
            {tags.length > 0 ? "add more tags" : "add tags"}
          </Control>
        )}

        {tag.isAdding && (
          <AddTagWrapper>
            <InputBorderless
              value={tag.input}
              placeholder="type here..."
              onChange={(e) => setTag({ ...tag, input: e.target.value })}
            />
            {tag.input ? (
              <FlexBox gapSize="small">
                {!tags.includes(tag.input) && (
                  <Control
                    onClick={addTag}
                    title={`create new tag for '${tag.input}'`}
                  >
                    {tag.input.includes(",") ? "create tags" : "create tag"}
                  </Control>
                )}
              </FlexBox>
            ) : null}
          </AddTagWrapper>
        )}
        {tag.isAdding && <Control onClick={toggleAddTag}>x</Control>}
      </FlexBox>
      <FlexBox gapSize="small">
        {tags?.map((tag) => (
          <TagStyle onClick={() => removeTag(tag)} key={`added_tag_${tag}`}>
            {tag}
          </TagStyle>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default Tags;
