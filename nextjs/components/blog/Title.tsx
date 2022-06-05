import React from "react";
import { BlogMessageTitle } from "../../styles/header";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { blogActions } from "../../state/actiontypes";
import { TitleBar } from "../../styles/containers";

type TitleProps = {
  title: string;
  isEditing: boolean;
  clickable?: boolean;
};

export const Title = ({ title, isEditing, clickable }: TitleProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const titlePlain = title?.replace(/_/g, " ");

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
    <BlogMessageTitle
      clickable={clickable}
      onClick={() => router.push(`/blog/post/${title}`)}
    >
      {titlePlain}
    </BlogMessageTitle>
  );
};

export default Title;
