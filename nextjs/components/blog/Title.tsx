import React from "react";
import { BlogMessageTitle } from "../../styles/header";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { blogActions } from "../../state/actiontypes";

const Title = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const titlePlain = title.replace(/_/g, " ");
  const router = useRouter();
  let { title: queryTitle } = router.query;

  if (queryTitle === title) {
    return <BlogMessageTitle>{titlePlain}</BlogMessageTitle>;
  }

  const loadPost = () => {
    router.push(`blog/${title}`);
  };

  return (
    <BlogMessageTitle clickable={true} onClick={loadPost}>
      {titlePlain}
    </BlogMessageTitle>
  );
};

export default Title;
