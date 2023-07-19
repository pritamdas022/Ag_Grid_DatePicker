import React,{useState} from "react";
import './FormIn.css';
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginForm = () => {
    const navigate=useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log(values);

    const apiUrl =
      "https://api.dentalbookingonline.com/api/Auth/login";

    try {
      // Make an API call to validate login data
      const response = await fetch(apiUrl, {
        method:'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.token) {
        // console.log('token',data);
        setIsLoggedIn(true);
        navigate("/table",{state:[data.token]})
        
      } else {
        setFieldError("password", "Invalid username or password");
      }
      setSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className=" form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (

          <Form onSubmit={handleSubmit} className="container">
            <Row className="my-4">
              <Col lg={12} sm={12}>
                <Form.Group className="px-5">
                  <Row>
                    <Form.Label>
                      Email:<span className="text-danger ">*</span>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Control
                      className="w-50"
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email}
                    />
                  </Row>

                  <Row>
                    {touched.email && errors.email && (
                      <small className="text-danger error_Field">
                        {errors.email}
                      </small>
                    )}
                  </Row>
                </Form.Group>
              </Col>
              <Col lg={12} sm={12}>
                <Form.Group className="px-5">
                  <Row>
                    <Form.Label>
                      Password:<span className="text-danger ">*</span>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Control
                      className="w-50"
                      name="password"
                      type="text"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password}
                    />
                  </Row>
                  <Row>
                    {touched.password && errors.password && (
                      <small className="text-danger error_Field">
                        {errors.password}
                      </small>
                    )}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="success" className="ms-5">
              Log in
            </Button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
