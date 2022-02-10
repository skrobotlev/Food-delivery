import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { loginEmailPassword, AuthForm, createUser, createFullUser } from "../../../api/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RectangleButton, { RectBut } from "../../buttons/rectangle-button";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button, makeStyles, createStyles, Theme } from "@material-ui/core";

const RegisterPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const RegisterFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  h2 {
    width: 80%;
    text-align: center;
    margin-top: 10px;
    font-size: 15px;
  }
  h3 {
    text-align: end;
    margin-top: 10px;
    font-size: 15px;
  }
  button {
    margin-top: 20px;
    width: 100%;
  }
  form {
    width: 80%;
  }
`;

const VisibilityIconComponent = styled.i`
  svg{
    position: absolute;
    top: 317px;
    left: 295px;
  }
`;

const VisibilityIconComponent2 = styled.i`
  svg {
    position: absolute;
    top: 405px;
    left: 295px;
  }
`;

const PasswordComponentDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const ErrorMessageDiv = styled.div`
  height: 20px;
`;

export interface RegisterForm {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastName: string;
}

interface IRegisterForm {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastName: string;
}

const RegistrationPage = observer(() => {
  const { userStore } = useContext(Context);
  const { push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRepPass, setShowRepPass] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    lastName: "",
  });

  useEffect(() => {
    setForm({ email, password, name, lastName, repeatPassword });
  }, [email, password, name, lastName, repeatPassword]);

  useEffect(() => {
    console.log(userStore._user);
  }, [userStore._user]);


  const handleRegister = () => {
    createFullUser(form).then((usr) => {
      console.log(usr, "user from registration");
      usr ? push("/home") : null;
    });
  };

  const RegisterPageValidSchema = Yup.object().shape({
    email: Yup.string().email().required("Введите корректный адрес"),
    // .matches(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S$/,
    //   // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
    //   "One uppercase, one lowercase, one special character and no spaces"
    // )
    password: Yup.string().min(6, "Пароль должен иметь от 6 символов").required("Password is required"),
    // repeatPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm Password is required"),
    repeatPassword: Yup.string()
      .required("Required")
      .test("password-match", "Пароли должны совпадать", function (value) {
        return this.parent.password === value;
      }),
    name: Yup.string().required("Пусто").min(3, "Минимум 3 буквы"),
    lastName: Yup.string().required("Пусто").min(3, "Минимум 3 буквы"),
  });
  // confirmPassword: Yup.string()
  // .required("Required")
  // .test("password-match", "Password musth match", function (value) {
  //     return this.parent.password === value;
  // }),
  // debugger;
  const visEyeIconShow = <VisibilityIcon fontSize="medium" onClick={() => setShowPass(showPass ? false : true)} />;
  const visEyeIconHide = <VisibilityOffIcon fontSize="medium" onClick={() => setShowPass(!showPass ? true : false)} />;
  const visEyeIconShow2 = <VisibilityIcon fontSize="medium" onClick={() => setShowRepPass(showRepPass ? false : true)} />;
  const visEyeIconHide2 = <VisibilityOffIcon fontSize="medium" onClick={() => setShowRepPass(!showRepPass ? true : false)} />;
  return (
    <RegisterPageDiv>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
          name: "",
          lastName: "",
        }}
        onSubmit={(values: IRegisterForm, actions) => {
          // createNewUser(values, actions.resetForm);
          // console.log("SIMBIT")
          // setTimeout(() => {
          //   actions.setSubmitting(false);
          // }, 5000);
        }}
        validationSchema={RegisterPageValidSchema}
      >
        {(props: FormikProps<IRegisterForm>) => {
          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
          return (
            <Form onSubmit={(e) => e.preventDefault()} className="formik-form">
              <RegisterFormDiv>
                <h1> ChelFood</h1>
                <h2>Введите логин и пароль</h2>
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

                  <Field
                    type={showPass ? "text" : "password"}
                    className={`form-control pwd text-field__input ${errors.password && touched.password ? "is-invalid " : ""}`}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleChange(e);
                    }}
                    value={values.password}
                  />
                  <VisibilityIconComponent>{showPass ? visEyeIconHide : visEyeIconShow}</VisibilityIconComponent>
                  <ErrorMessageDiv>
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <small className="text-danger">
                          <strong>{msg}</strong>
                        </small>
                      )}
                    />
                  </ErrorMessageDiv>

                  <Field
                    type={showRepPass ? "text" : "password"}
                    className={`form-control pwd text-field__input ${errors.repeatPassword && touched.repeatPassword ? "is-invalid " : ""}`}
                    placeholder="Repeat password"
                    name="repeatPassword"
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                      handleChange(e);
                    }}
                    value={values.repeatPassword}
                  />
                  <VisibilityIconComponent2>{showRepPass ? visEyeIconHide2 : visEyeIconShow2}</VisibilityIconComponent2>
                  <ErrorMessageDiv>
                    <ErrorMessage
                      name="repeatPassword"
                      render={(msg) => (
                        <small className="text-danger">
                          <strong>{msg}</strong>
                        </small>
                      )}
                    />
                  </ErrorMessageDiv>

                  <Field
                    type="text"
                    className={`form-control pwd text-field__input ${errors.name && touched.name ? "is-invalid " : ""}`}
                    placeholder="Name"
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                      handleChange(e);
                    }}
                    value={values.name}
                  />
                  {/* <VisibilityIconComponent>{showPass ? visEyeIconHide : visEyeIconShow}</VisibilityIconComponent> */}
                  <ErrorMessageDiv>
                    <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <small className="text-danger">
                          <strong>{msg}</strong>
                        </small>
                      )}
                    />
                  </ErrorMessageDiv>

                  <Field
                    type="text"
                    className={`form-control pwd text-field__input ${errors.lastName && touched.lastName ? "is-invalid " : ""}`}
                    placeholder="Last name"
                    name="lastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      handleChange(e);
                    }}
                    value={values.lastName}
                  />
                  <ErrorMessageDiv>
                    <ErrorMessage
                      name="lastName"
                      render={(msg) => (
                        <small className="text-danger">
                          <strong>{msg}</strong>
                        </small>
                      )}
                    />
                  </ErrorMessageDiv>


                  <h3>
                    или{" "}
                    <Link to="/login" className="router-link">
                      {" "}
                      войдите{" "}
                    </Link>
                  </h3>
                </form>
              </RegisterFormDiv>
            </Form>
          );
        }}
      </Formik>
      <RectBut size="md" title="Register" onClick={() => handleRegister()}>
        Registration
      </RectBut>
      {/* ========================================================================================= */}
      {/* <h1>ChelFood</h1>
      <h2>Заполните форму</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <RegisterInput type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
        <RegisterInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
        <RegisterInput type="password" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} placeholder="Repeat password" />

        <RegisterInput type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
        <RegisterInput type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last name" />
      </form>

      <RectBut size="md" title="Register" onClick={() => handleRegister()}>
        Registration
      </RectBut>
      <h3>
        или <Link to="/login" className="router-link"> войдите </Link>
      </h3> */}

      {/* </RegisterFormDiv> */}
    </RegisterPageDiv>
  );
});

export default RegistrationPage;
