import styled from "styled-components";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StyledValidForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const ValidationTextField = styled.input``;

const ValidationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ValidateFormDiv = styled.div`
width: 80%;
height: 50%;
border: 2px solid;
border-color: green;
`;

interface ISignUpForm {
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Signed up successfully.",
    type: "success",
  },
  duplicate: {
    message: "Email-id already exist. Please use different email-id.",
    type: "error",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

const ValidationForm = () => {
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });

  return (
    <ValidationDiv>
      <ValidateFormDiv>
        <Formik
          initialValues={{
            fullName: "",
            password: "",
            confirmPassword: "",
            email: "",
          }}
          onSubmit={(values: ISignUpForm, actions) => {
            // createNewUser(values, actions.resetForm);
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Enter valid email-id"),
            password: Yup.string()
              // .matches(
              //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S$/,
              //   // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
              //   "One uppercase, one lowercase, one special character and no spaces"
              // )
              .min(8, "Must be min 8")
              .max(20, "Must be mx 20")
              // .required(
              //   "Please valid password. One uppercase, one lowercase, one special character and no spaces"
              // )
              .required("Required"),
            confirmPassword: Yup.string()
              .required("Required")
              .test("password-match", "Password musth match", function (value) {
                return this.parent.password === value;
              }),
          })}
        >
          {(props: FormikProps<ISignUpForm>) => {
            const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
            return (
              <Form>
                <h1>Sign up</h1>

                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="password"
                    className={`form-control text-field__input ${errors.password && touched.password ? " is-invalid" : ""}`}
                    placeholder="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <small className="text-danger">
                        <strong>{msg}</strong>
                      </small>
                    )}
                  />
                </div>


                <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                  Submit
                </Button>
                {displayFormStatus && (
                  <div className="formStatus">
                    {formStatus.type === "error" ? <p>{formStatus.message}</p> : formStatus.type === "success" ? <p>{formStatus.message}</p> : null}
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </ValidateFormDiv>
    </ValidationDiv>
  );
};

export default ValidationForm;
