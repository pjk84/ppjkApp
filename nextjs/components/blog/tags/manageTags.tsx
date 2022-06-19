import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state";
import { Control } from "../../../styles/buttons";
import { FlexBox } from "../../../styles/containers";
import { InputBorderless } from "../../../styles/input";
import { Tag as TagStyle, TagBox } from "../../../styles/blog";
import { useDispatch } from "react-redux";
import { blogActions } from "../../../state/actiontypes";
import { Tag } from "../types";
import apiClient from "../../../api/client";
import { create } from "lodash";

const Tags = () => {
  const dispatch = useDispatch();
  const tags: string[] =
    useSelector((state: RootState) => state.blog.draft?.tags) || [];
  const [newTags, setTags] = useState<{
    input: string;
    isAdding: boolean;
  }>({ input: "", isAdding: false });

  const addTag = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({
      type: blogActions.SET_DRAFT,
      draft: {
        tags: [
          ...tags,
          ...newTags.input
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t && !tags.includes(t)),
        ],
      },
    });
    setTags({ ...newTags, input: "" });
  };

  const removeTag = (tagName: string) => {
    dispatch({
      type: blogActions.SET_DRAFT,
      draft: { tags: tags.filter((t) => t !== tagName) },
    });
  };

  const handleKey = () => {
    if (!newTags.input) {
      setTags({ ...newTags, isAdding: false });
    }
  };

  const allTags = tags.concat(
    Array.from(
      new Set(
        newTags.input
          .split(",")
          .map((tag) => tag.trim())
          .filter((t) => t && !tags.includes(t))
      )
    )
  );

  return (
    <FlexBox column>
      <form onSubmit={addTag}>
        <InputBorderless
          value={newTags.input}
          placeholder="add tags"
          onChange={(e) => setTags({ ...newTags, input: e.target.value })}
          onKeyDown={(e) => {
            if (e.code == "Backspace") {
              handleKey();
            }
          }}
        />
      </form>
      <TagBox style={{ marginTop: tags.length > 0 || newTags.input ? 20 : 0 }}>
        {allTags.length > 0 && (
          <FlexBox gapSize="small" wrap={"true"} align="center">
            {allTags?.map((tag, i) => (
              <TagStyle
                onClick={() => removeTag(tag)}
                key={`tag_${tag}`}
                style={{ opacity: i >= tags.length ? 0.4 : 1 }}
              >
                {tag}
              </TagStyle>
            ))}
            {newTags.input && (
              <span style={{ opacity: 0.4 }}>press enter to add new tags</span>
            )}
          </FlexBox>
        )}
      </TagBox>
    </FlexBox>
  );
};

export default Tags;
