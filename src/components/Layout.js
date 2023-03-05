import React from "react";
import Header from "./Header";
import Container from "react-bootstrap/Container";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
