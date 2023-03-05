import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Alert from "react-bootstrap/Alert";
import { getUserPosts } from "../services/AppService";
import TableWrapper from "../components/TableWrapper";
import { getLocalStorageItem, setLocalStorageItem } from "../utils";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePosts = (userId, data) => {
    const _posts = getLocalStorageItem("posts");
    if (_posts) {
      const postsId = data.map((item) => item.id);
      const existPosts = _posts.filter((item) => postsId.includes(item.id));
      if (existPosts.length > 0) {
        setPosts(
          _posts.filter(
            (item) =>
              item.userId === userId || item.sharedUsers.includes(userId)
          )
        );
      } else {
        setLocalStorageItem("posts", [..._posts, ...data]);
        setPosts([..._posts, ...data]);
      }
    } else {
      setPosts(data);
      setLocalStorageItem("posts", data);
    }
  };

  useEffect(() => {
    const user = getLocalStorageItem("user");
    setUserName(user.name);
    setLoading(true);
    getUserPosts(user.id)
      .then((res) => {
        if (res.status === 200) {
          handlePosts(user.id, res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("There is some network issue...");
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Alert key={"primary"} variant={"primary"}>
        Hi, {userName}
      </Alert>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <TableWrapper
          header={["#", "Title", "Description", "Action"]}
          body={posts}
          action={{
            title: "View",
            variant: "primary",
          }}
          handleClick={(id) => {
            navigate(`/posts/${id}`);
          }}
        />
      ) : error !== "" ? (
        <p>{error}</p>
      ) : (
        <p>No post available</p>
      )}
    </Layout>
  );
}

export default Home;
