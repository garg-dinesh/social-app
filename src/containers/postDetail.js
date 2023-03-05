import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  getSharedUser,
  getSharedUsers,
} from "../utils";
import TableWrapper from "../components/TableWrapper";
import PostForm from "../components/PostForm";
import "../styles/containers/postDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [sharedUsers, setSharedUsers] = useState([]);
  const [isFlag, setIsFlag] = useState({
    isEdit: false,
    isSharedUser: false,
    isShare: false,
  });
  const [email, setEmail] = useState("");
  const posts = getLocalStorageItem("posts");

  useEffect(() => {
    const _post = posts?.find((item) => item.id === +id);
    setPost(_post);

    if (Object.keys(_post)?.includes("sharedUsers")) {
      setSharedUsers(getSharedUsers(_post["sharedUsers"]));
    }
  }, []);

  useEffect(() => {
    const _post = posts?.find((item) => item.id === +id);
    setPost(_post);
    setSharedUsers(getSharedUsers(_post["sharedUsers"]));
  }, [isFlag]);

  const handleRemoveSharedUser = (id) => {
    const _post = {
      ...post,
      sharedUsers: post.sharedUsers.filter((user) => user !== id),
    };
    setSharedUsers(post.sharedUsers.filter((user) => user !== id));
    setLocalStorageItem(
      "posts",
      posts.map((post) =>
        post.id === _post.id && post.userId === _post.userId ? _post : post
      )
    );
    setIsFlag({ ...isFlag, isSharedUser: !isFlag.isSharedUser });
  };

  const handleRemovePost = (postId) => {
    if (getLocalStorageItem("user").id === post.userId) {
      setLocalStorageItem(
        "posts",
        posts.filter((post) => post.id !== postId)
      );
      navigate("/posts");
    } else {
      toast("This post is published by another user!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleEdit = () => {
    if (getLocalStorageItem("user").id === post.userId) {
      setIsFlag({ ...isFlag, isEdit: !isFlag.isEdit });
    } else {
      toast("This post is published by another user!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleUpdate = (values) => {
    const sharedUser =
      values.sharedEmail !== "" ? getSharedUser(values.sharedEmail) : {};
    const _post = {
      id: post.id,
      title: values.title,
      body: values.body,
      userId: post.userId,
      sharedUsers: sharedUser.id
        ? [...post?.sharedUsers, sharedUser.id]
        : post.sharedUsers
        ? [...post.sharedUsers]
        : [],
    };

    setLocalStorageItem(
      "posts",
      posts.map((item) => (item.id === _post.id ? _post : item))
    );
    setIsFlag({
      ...isFlag,
      isEdit: false,
    });
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (getSharedUser(email)) {
      const user = getSharedUser(email);
      setLocalStorageItem(
        "posts",
        posts.map((item) =>
          item.id === post.id
            ? { ...item, sharedUsers: [...item.sharedUsers, user.id] }
            : item
        )
      );
    }
    setIsFlag({ ...isFlag, isShare: !isFlag.isShare });
    setEmail("");
  };

  return (
    <Layout>
      <div>
        <div>
          <Alert key={"title"} variant={"info"}>
            {post?.title}
          </Alert>
          <p>{post?.body}</p>
        </div>
        <div>
          <p>
            <strong>Post shared with users:</strong>
          </p>
          {sharedUsers?.length > 0 ? (
            <TableWrapper
              header={["#", "Name", "Email", "Action"]}
              body={sharedUsers}
              action={{
                title: "x",
                variant: "secondary",
              }}
              handleClick={handleRemoveSharedUser}
            />
          ) : (
            <p>No user</p>
          )}
        </div>
        <div className="button-container">
          <Button variant="warning" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsFlag({ ...isFlag, isShare: !isFlag.isShare })}
          >
            Share
          </Button>
          <Button variant="danger" onClick={() => handleRemovePost(post.id)}>
            Delete
          </Button>
        </div>
      </div>
      {isFlag.isEdit && <PostForm post={post} onSubmit={handleUpdate} />}
      {isFlag.isShare && (
        <div>
          <Form onSubmit={handleShare}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </Layout>
  );
}

export default PostDetail;
