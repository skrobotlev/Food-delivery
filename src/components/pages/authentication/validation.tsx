import { useForm } from "react-hook-form";
import styled from "styled-components";
import { loginContent } from "./login-content";
// import { useFormValidation } from "./useFormValidation";
// import App from "./valid-test";
// import { ValidationSchemaExample } from "./valid-test";
import React, { useState } from "react";
import { Grid, TextField, Button, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StyledValidForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

// const isText = RegExp(/^[A-Z ]{3,}$/i);
// const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

// const initialValues = {
//   name: {
//     value: "",
//     error: ""
//   },
//   email: {
//     value: "",
//     error: ""
//   }
// };

// const validationShcema = {
//   name: {
//     required: true,
//     validator: {
//       regEx: isText,
//       error: "Please enter a valid name."
//     }
//   },
//   email: {
//     required: true,
//     validator: {
//       regEx: isEmail,
//       error: "Please enter a valid email address."
//     }
//   }
// };

// const handleCallback = values => {
//   console.log(values);
// };

// export const ValidationForm = () => {

//   const { state, disabled, handleChange, handleSubmit } = useFormValidation(
//     initialValues,
//     validationShcema,
//     handleCallback
//   );

//   const { name, email } = state;

//   return (
//     <form onSubmit={handleSubmit} noValidate>
//       <div className="form-group">
//         <input
//           type="text"
//           name="name"
//           autoComplete="name"
//           placeholder="Name"
//           onChange={handleChange}
//           value={name.value}
//           className={`form-control ${name.error ? "is-invalid" : name.value ? " is-valid" : ""
//             } `}
//         />
//         {name.error && <div className="invalid-feedback">{name.error}</div>}
//       </div>
//       <div className="form-group">
//         <input
//           type="email"
//           name="email"
//           autoComplete="email"
//           placeholder="Email"
//           onChange={handleChange}
//           value={email.value}
//           className={`form-control ${email.error ? "is-invalid" : email.value ? " is-valid" : ""
//             } `}
//         />
//         {email.error && <div className="invalid-feedback">{email.error}</div>}
//       </div>
//       <button className="btn btn-primary" type="submit" disabled={disabled}>
//         Submit
//       </button>
//     </form>
//   );
// };

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

  // const createNewUser = async (data: ISignUpForm, resetForm: Function) => {
  //   try {
  //     // API call integration will be here. Handle success / error response accordingly.
  //     if (data) {
  //       setFormStatus(formStatusProps.success);
  //       resetForm({});
  //     }
  //   } catch (error) {
  //     const response = error.response;
  //     if (response.data === "user already exist" && response.status === 400) {
  //       setFormStatus(formStatusProps.duplicate);
  //     } else {
  //       setFormStatus(formStatusProps.error);
  //     }
  //   } finally {
  //     setDisplayFormStatus(true);
  //   }
  // };

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
      {/* <App /> */}
      {/* <ValidationSchemaExample /> */}
    </ValidationDiv>
  );
};

export default ValidationForm;
