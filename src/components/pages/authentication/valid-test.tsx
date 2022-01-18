import { observer } from "mobx-react-lite";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../..";
import { loginEmailPassword, AuthForm, createUser, signOutButton, loginWithGoogle } from "../../../api/auth";
import { auth } from "../../../firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RectangleButton, { RectBut } from "../../buttons/rectangle-button";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PASSWORD_RECOVERY, REGISTRATION_PAGE } from "../../routing/consts";
import { useForm } from "react-hook-form";
import ValidationForm from "./validation";
import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button, makeStyles, createStyles, Theme } from "@material-ui/core";

const LoginPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginInput = styled.input`
  display: flex;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  :first-of-type {
    margin-top: 10px;
  }
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

const LoginFormDiv = styled.div`
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
    margin-bottom: 10px;
    margin-top: 0px;
    font-size: 15px;
  }
  h3 {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 15px;
  }
  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 15px;
  }
  h5 {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 15px;
  }

  button:first-of-type {
    margin-top: 10px;
    width: 80%;
  }
  input:first-of-type {
    margin-top: 10px;
  }

  form {
    width: 80%;
  }
`;

const VisibilityIconComponent = styled.i`
  svg {
    position: absolute;
    top: 400px;
    left: 298px;
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

const GoogleAuth = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  /* width: 30%; */
  font-size: 20px;
  border: 2px solid;
  border-radius: 20px;
  /* margin-top: 10px; */
  width: 80%;
  background-color: #f5f7f4;
  border-color: #91c788;
  svg {
    /* padding-left: 5px; */
    color: #91c788;
    /* bottom: 10px; */
  }
  p {
    margin-bottom: 0px;
  }
`;

interface ISignInForm {
    password: string;
    email: string;
}

interface IFormStatus {
    message: string;
    type: string;
}

interface IFormStatusProps {
    [key: string]: IFormStatus;
}

const LoginPageValidSchema = Yup.object().shape({
    email: Yup.string().email().required("Поле пустое"),
    // .matches(
    //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S$/, "Пароль не подходит"),
    // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
    //   "One uppercase, one lowercase, one special character and no spaces"
    // )
    password: Yup.string().min(6, "Минимум 6 симолов").max(20, "Максимум 20 символов"),
    // .required(
    //   "Please valid password. One uppercase, one lowercase, one special character and no spaces"
    // )
    // .required("Пусто!"),
    // confirmPassword: Yup.string()
    //     .required("Required")
    //     .test("password-match", "Password musth match", function (value) {
    //         return this.parent.password === value;
    //     }),
});

// const formStatusProps: IFormStatusProps = {
//     success: {
//         message: "Signed up successfully.",
//         type: "success",
//     },
//     duplicate: {
//         message: "Email-id already exist. Please use different email-id.",
//         type: "error",
//     },
//     error: {
//         message: "Something went wrong. Please try again.",
//         type: "error",
//     },
// };

const ValidationLoginPage = observer(() => {
    const { userStore } = useContext(Context);
    const { push } = useHistory();

    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState<AuthForm>({
        email: "",
        password: "",
    });

    useEffect(() => {
        setForm({ email, password });
    }, [email, password]);

    useEffect(() => {
        console.log(userStore._isAuth);
    }, [userStore._isAuth]);

    const handleLogin = () => {
        loginEmailPassword({ email, password }).then((usr) => {
            // userStore.setIsAuth(true);
            // userStore.setUser(usr);
            {
                usr ? push("/home") : null;
            }
        });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle().then((usr) => push("/home"));
    };

    // const [displayFormStatus, setDisplayFormStatus] = useState(false);
    // const [formStatus, setFormStatus] = useState<IFormStatus>({
    //     message: "",
    //     type: "",
    // });

    const visEyeIconShow = <VisibilityIcon fontSize="medium" onClick={() => setShowPass(showPass ? false : true)} />;
    const visEyeIconHide = <VisibilityOffIcon fontSize="medium" onClick={() => setShowPass(!showPass ? true : false)} />;

    useEffect(() => {
        console.log(userStore._user);
    }, [userStore._user]);

    return (
        <LoginPageDiv>
            {/* <ValidationForm /> */}
            {/* <LoginFormDiv> */}

            <Formik
                initialValues={{
                    password: "",
                    email: "",
                }}
                onSubmit={(values: ISignInForm, actions) => {
                    // createNewUser(values, actions.resetForm);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                        console.log(values);
                    }, 500);
                }}
                validationSchema={LoginPageValidSchema}
            >
                {(props: FormikProps<ISignInForm>) => {
                    const { values, touched, errors, handleBlur, handleChange, isSubmitting, setValues } = props;
                    return (
                        <Form className="formik-form">
                            <LoginFormDiv>
                                {/* <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                                    Submit
                                </Button> */}
                                {/* {displayFormStatus && (
                                    <div className="formStatus">
                                        {formStatus.type === "error" ? <p>{formStatus.message}</p> : formStatus.type === "success" ? <p>{formStatus.message}</p> : null}
                                    </div>
                                )} */}
                                <h1> ChelFood</h1>
                                <h2>Введите логин и пароль</h2>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    {/* <Field type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" /> */}
                                    <Field
                                        type="email"
                                        className={`form-control text-field__input ${errors.email && touched.email ? " is-invalid" : ""}`}
                                        placeholder="Email"
                                        name="email"
                                        onChange={(e, value) => {
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
                                    {/* <ErrorMessage
                                        name="password"
                                        render={(msg) => (
                                            <small className="text-danger">
                                                <strong>{msg}</strong>
                                            </small>
                                        )}
                                    /> */}
                                    {/* <LoginInput type={showPass ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" /> */}
                                </form>

                                <RectBut
                                    type="submit"
                                    size="md"
                                    title="Log In"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Log In
                                </RectBut>
                                <h4> or</h4>
                                <GoogleAuth onClick={() => handleGoogleLogin()}>
                                    <p>Sign up with</p>
                                    <GoogleIcon fontSize="small" />
                                </GoogleAuth>

                                <h5>
                                    или{" "}
                                    <Link to={REGISTRATION_PAGE} className="router-link">
                                        {" "}
                                        зарегистрируйтесь!{" "}
                                    </Link>
                                </h5>
                                <Link to={PASSWORD_RECOVERY} className="router-link">
                                    <h3>Забыли пароль?</h3>
                                </Link>
                            </LoginFormDiv>
                        </Form>
                    );
                }}
            </Formik>
        </LoginPageDiv>
    );
});

export default ValidationLoginPage;
