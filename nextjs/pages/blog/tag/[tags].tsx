import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Main } from "../../../components/blog";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../../state/actiontypes";
import { RootState } from "../../../state";
const PostsByTag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tags } = router.query;

  useEffect(() => {
    if (!tags) return;
    const t = String(tags).split("&");
    dispatch({
      type: blogActions.SET_SELECTED_TAGS,
      tags: t,
    });
  });
  if (!tags) return null;
  return <Main tags={String(tags).split("&")} />;
};

export default PostsByTag;
