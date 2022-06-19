import React, { useMemo, useState } from "react";
import "draft-js/dist/Draft.css";
import { EditorProps } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import { TextEdit } from "../../styles/containers";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../state/actiontypes";
import { Post } from "./types";
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
  const handleState = (e: EditorState) => {
    const body = draftToHtml(convertToRaw(e.getCurrentContent()));
    if (draft && body.length === draft.body?.length) {
      // this prevents setting draft on input blur when submit is clicked
      return;
    }
    setEditorState(e);
    dispatch({
      type: blogActions.SET_DRAFT,
      draft: {
        ...draft,
        body,
      },
    });
  };
  const flush = () => {
    debounced.flush;
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
        placeholder="add post"
        toolbarStyle={{
          padding: 0,
          margin: 0,
          border: "none",
        }}
        editorStyle={{ color: color }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "colorPicker",
            "link",
            "emoji",
          ],
          inline: {
            inDropdown: false,
            className: "test",
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline"],
          },
          blockType: {
            inDropdown: false,
            options: ["Code", "Blockquote"],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
        }}
        onBlur={flush}
        defaultEditorState={editorState}
        onEditorStateChange={debounced}
      />
    </TextEdit>
  );
};

export default TextEditor;
