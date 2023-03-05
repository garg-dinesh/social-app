import React from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { getLocalStorageItem } from "./utils";
import Home from "./containers/home";
import Login from "./containers/login";
import NewPost from "./containers/newPost";
import PostDetail from "./containers/postDetail";

const PrivateRoute = () => {
  const user = getLocalStorageItem("user");
  return true ? <Outlet /> : <Navigate to="/" />;
};

function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route exact path="/posts" element={<Home />} />
        <Route exact path="/posts/new" element={<NewPost />} />
        <Route exact path="/posts/:id" element={<PostDetail />} />
      </Route>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
}

export default Router;
