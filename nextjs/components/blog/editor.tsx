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
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../state/actiontypes";
import { appTheme } from "../../styles";
import { Post } from "./types";
import Controls from "./MessageControls";
import { RootState } from "../../state";
import _ from "lodash";

type Props = {
  post: Post;
  isEditing?: boolean;
  getEditorStateAsHtml?: (text: string) => void;
};

const TextEditor = () => {
  let draft = useSelector((state: RootState) => state.blog.draft);
  const [color, setColor] = useState<string>("black");

  const getEditorState = (body: string) => {
    if (!body) return EditorState.createEmpty();
    const blocksFromHtml = htmlToDraft(body);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(getEditorState(draft?.body));
  const handleState = (e: any) => {
    setEditorState(e);

    dispatch({
      type: blogActions.SET_DRAFT,
      draft: {
        ...draft,
        body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      },
    });
  };

  const debounced = _.debounce((e) => handleState(e), 300);

  const Editor = useMemo(() => {
    return dynamic<EditorProps>(
      () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
      { ssr: false }
    );
  }, []);

  return (
    <TextEdit>
      <Editor
        stripPastedStyles={true}
        placeholder="add message here.."
        toolbarStyle={{
          padding: 0,
          margin: 0,
          border: "none",
        }}
        editorStyle={{ color: color }}
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
    </TextEdit>
  );
};

export default TextEditor;
