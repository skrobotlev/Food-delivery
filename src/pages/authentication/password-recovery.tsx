import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { forgotPassword } from "@/api/auth";
import { RectBut } from "@/components/buttons/rectangle-button";
import { LOGIN_PAGE } from "@/router/consts";
import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RecPassPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  height: 100vh;
  h3,
  h2 {
    /* display: flex;  */
    font-size: 15px;
    /* align-items: flex-end; */
    /* text-align: end; */
  }
  h3 {
    text-align: end;
    margin-top: 10px;
  }
`;

const RecPassInput = styled.input`
  display: flex;
  width: 100%;
  height: 45px;
  margin-top: 15px;
  padding-left: 15px;
  font-family: "Balsamiq Sans";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #f4f4f4;
  // background-clip: padding-box;
  border: 1px solid #1a9920;
  border-radius: 30px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: 0.5s padding-left;
  &:focus {
    padding-left: 20px;
  }
`;

const RecPassFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  h1 {
    /* margin-bottom: 100px; */
    font-weight: bold;
    color: green;
    font-family: "Balsamiq Sans";
    font-size: 50px;
    border-radius: 2px "solid";
    border-color: green;
    margin-bottom: 50px;
  }
  button {
    margin-top: 20px;
    width: 100%;
  }
  form {
    width: 80%;
  }
`;

const ErrorMessageDiv = styled.div`
  height: 20px;
`;

interface PassRecoveryForm {
  email: string;
}

const PassRecoveryValidSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Enter valid email-id"),

});

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const { push } = useHistory();

  const handlePasswordRecovery = (email) => {
    forgotPassword(email)
      .then((res) => {
        setEmail("");
        setTimeout((res) => {
          {
            res ? push("/login") : null;
          }
        }, 2000);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <RecPassPageDiv>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values: PassRecoveryForm, actions) => {
          // createNewUser(values, actions.resetForm);
          setTimeout(() => {
            console.log(values);
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={PassRecoveryValidSchema}
      >
        {(props: FormikProps<PassRecoveryForm>) => {
          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
          return (
            <Form className="formik-form">
              <RecPassFormDiv>
                <h1>ChelFood</h1>
                <h2>Введите Email</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                  <Field
                    type="email"
                    className={`form-control text-field__input ${errors.email && touched.email ? " is-invalid" : ""}`}
                    placeholder="Email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleChange(e);
                    }}
                    value={values.email}
                  />
                  <ErrorMessageDiv>
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <small className="text-danger">
                          <strong>{msg}</strong>
                        </small>
                      )}
                    />
                  </ErrorMessageDiv>

                  <RectBut type="submit" size="md" onClick={() => handlePasswordRecovery(email)}>
                    Reset
                  </RectBut>
                  <h3>
                    <Link to={LOGIN_PAGE} className="router-link">
                      или войдите
                    </Link>
                  </h3>
                </form>
              </RecPassFormDiv>
            </Form>
          );
        }}
      </Formik>
    </RecPassPageDiv>
  );
};

export default PasswordRecovery;
