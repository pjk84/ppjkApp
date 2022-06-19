import React from "react";
import { useDispatch } from "react-redux";
import { blogActions } from "../../state/actiontypes";
import { TitleBar } from "../../styles/containers";
import { Header2 } from "../../styles/header";

type TitleProps = {
  title: string;
  newPost?: boolean;
  clickable?: boolean;
};

export const Title = ({ title, newPost }: TitleProps) => {
  const dispatch = useDispatch();

  const titlePlain = title?.replace(/_/g, " ");

  return newPost ? (
    <TitleBar
      newMessage={!title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          type: blogActions.SET_DRAFT,
          draft: { title: e.target.value },
        })
      }
      defaultValue={title}
      placeholder="add title"
    />
  ) : (
    <Header2>{titlePlain}</Header2>
  );
};

export default Title;
