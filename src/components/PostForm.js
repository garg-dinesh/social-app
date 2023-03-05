import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import "../styles/components/PostForm.css";

function PostForm({ onSubmit, post }) {
  const [initialValues, setInitialValues] = useState({
    title: "",
    body: "",
    sharedEmail: "",
  });

  useEffect(() => {
    setInitialValues({
      title: post?.title,
      body: post?.body,
      sharedEmail: "",
    });
  }, []);

  const validationSchema = yup.object({
    title: yup.string().required("This is required field"),
    body: yup.string().required("This is required field"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, errors, values, ...props }) => {
        if (post) {
          props.initialValues.title = initialValues.title;
          props.initialValues.body = initialValues.body;
        }
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={handleChange}
                isInvalid={errors?.title}
                value={values.title}
              />
              {errors.title && (
                <span className="error-message">
                  <ErrorMessage name="title" />
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="body">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                isInvalid={errors?.body}
                value={values.body}
              />
              {errors.body && (
                <span className="error-message">
                  <ErrorMessage name="body" />
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="sharedEmail">
              <Form.Label>Sharing email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={values.sharedEmail}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PostForm;
