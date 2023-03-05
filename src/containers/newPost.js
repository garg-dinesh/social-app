import React from "react";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  getSharedUser,
} from "../utils";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const navigate = useNavigate();
  const user = getLocalStorageItem("user");

  const handleNewPost = (values) => {
    const sharedUser =
      values.sharedEmail !== "" ? getSharedUser(values.sharedEmail) : {};
    const _post = {
      id: Math.random(),
      title: values.title,
      body: values.body,
      userId: user.id,
      sharedUsers: sharedUser.id ? [sharedUser.id] : [],
    };
    setLocalStorageItem("posts", [...getLocalStorageItem("posts"), _post]);
    navigate(`/posts/${_post.id}`);
  };
  return (
    <Layout>
      <h2>new post</h2>
      <PostForm onSubmit={handleNewPost} />
    </Layout>
  );
}

export default NewPost;
