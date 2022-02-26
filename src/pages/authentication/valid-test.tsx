import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Context } from "@/store";
import { loginEmailPassword, AuthForm, loginWithGoogle } from "@/api/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { RectBut } from "@/components/buttons/rectangle-button";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PASSWORD_RECOVERY, REGISTRATION_PAGE } from "@/router/consts";
import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  h1 {
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

const ErrorMessageDiv = styled.div`
  height: 20px;
`;

const GoogleAuth = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  font-size: 20px;
  border: 2px solid;
  border-radius: 20px;
  width: 80%;
  background-color: #f5f7f4;
  border-color: #91c788;
  svg {
    color: #91c788;
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
    email: Yup.string().email().required("Поле пустое!"),
    password: Yup.string().min(6, "Минимум 6 симолов").max(20, "Максимум 20 символов").required("Поле пустое!Минимум 6 символов"),
});

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
        console.log(userStore.isAuth);
    }, [userStore.isAuth]);

    const handleLogin = () => {
        loginEmailPassword({ email, password }).then((usr) => {

            {
                usr ? push("/home") : null;
            }
        });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle().then((usr) => push("/home"));
    };



    const visEyeIconShow = <VisibilityIcon fontSize="medium" onClick={() => setShowPass(showPass ? false : true)} />;
    const visEyeIconHide = <VisibilityOffIcon fontSize="medium" onClick={() => setShowPass(!showPass ? true : false)} />;

    useEffect(() => {
        console.log(userStore.user);
    }, [userStore.user]);

    return (
        <LoginPageDiv>
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
                                =<h1> ChelFood</h1>
                                <h2>Введите логин и пароль</h2>
                                <form onSubmit={(e) => e.preventDefault()}>
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
