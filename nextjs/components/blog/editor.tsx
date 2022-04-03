import React, { useEffect, useMemo, useState } from "react";
import "draft-js/dist/Draft.css";
import { EditorProps } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import { TextEdit, FlexBox } from "../../styles/containers";
import { Control } from "../../styles/buttons";
import { useDispatch } from "react-redux";
import { blogActions } from "../../state/actiontypes";
import { appTheme } from "../../styles";
import { Post } from "./types";
import Controls from "./MessageControls";
import _ from "lodash";

type Props = {
  post: Post;
  isEditing?: boolean;
  getEditorStateAsHtml?: (text: string) => void;
};

const TextEditor = ({ post, getEditorStateAsHtml }: Props) => {
  const getEditorState = () => {
    const blocksFromHtml = htmlToDraft(post.body);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(getEditorState());
  const [showTools, toggleTools] = useState(false);
  const handleChange = (e: any) => {
    const contentAsHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setEditorState(e);
    dispatch({
      type: blogActions.SET_DRAFT,
      draft: { ...post, body: contentAsHtml },
    });
  };

  useEffect(() => {
    if (getEditorStateAsHtml)
      getEditorStateAsHtml(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
  });

  const debounced = _.debounce((e) => handleChange(e), 300);

  const Editor = useMemo(() => {
    return dynamic<EditorProps>(
      () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
      { ssr: false }
    );
  }, []);

  return (
    <TextEdit>
      <div style={{ width: "100%" }}>
        <Control onClick={() => toggleTools(!showTools)}>{`${
          showTools ? "hide" : "show"
        } toolbar`}</Control>
        <Editor
          stripPastedStyles={true}
          placeholder="add message here.."
          toolbarStyle={{
            backgroundColor: appTheme.gray,
            border: "none",
            display: !showTools && "none",
          }}
          toolbar={{
            options: ["inline", "fontSize", "colorPicker", "link", "emoji"],
            inline: {
              inDropdown: false,
              className: "test",
              component: undefined,
              dropdownClassName: undefined,
              options: ["bold", "italic", "underline"],
            },
          }}
          onBlur={debounced.flush}
          defaultEditorState={editorState}
          onEditorStateChange={debounced}
        />
      </div>
    </TextEdit>
  );
};

export default TextEditor;
