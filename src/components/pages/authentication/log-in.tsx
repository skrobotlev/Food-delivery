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
import ValidationLoginPage from "./valid-test";

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
  h2 {
    margin-bottom: 10px;
    margin-top: 0px;
  }
  h3 {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  h5 {
    margin-top: 10px;
    margin-bottom: 0px;
  }
  
  button:first-of-type {
    margin-top: 10px;
    width: 80%;
  }
  form {
    width: 80%;
  }
`;

const VisibilityIconComponent = styled.i`
  svg {
    position: relative;
    bottom: 36px;
    left: 265px;
  }
`;

const GoogleAuth = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 30%; */
  font-size: 20px;
  border: 1px solid;
  border-radius: 10px;
  margin-top: 10px;
    width: 80%;
    background-color: #f5f7f4;
    border-color: #91C788;
  svg {
    /* padding-left: ; */
    color: #91C788;
    /* bottom: 10px; */
  }
  p {
    margin-bottom: 0px;
  }
`;


const LoginPage = observer(() => {
  const { userStore } = useContext(Context);
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      push("/home");
    });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle().then((usr) => push("/home"));
  };

  const visEyeIconShow = <VisibilityIcon fontSize="medium" onClick={() => setShowPass(showPass ? false : true)} />;
  const visEyeIconHide = <VisibilityOffIcon fontSize="medium" onClick={() => setShowPass(!showPass ? true : false)} />;

  useEffect(() => {
    console.log(userStore._user);
  }, [userStore._user]);
  return (
    <LoginPageDiv>
      <ValidationLoginPage />
      {/* <LoginFormDiv>
        <h1>ChelFood</h1>
        <h2>Введите логин и пароль</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <LoginInput type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
          <LoginInput
            type={showPass ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />

          <VisibilityIconComponent>
            {showPass ? visEyeIconShow : visEyeIconHide}
          </VisibilityIconComponent>
        </form>
        <Link to={PASSWORD_RECOVERY} className="router-link">
          <h3>Забыли пароль?</h3>
        </Link>
        <RectBut
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
          <GoogleIcon />
        </GoogleAuth>
        <h5>
          или{" "}
          <Link to={REGISTRATION_PAGE} className="router-link">
            {" "}
            зарегистрируйтесь{" "}
          </Link>
        </h5>
      </LoginFormDiv> */}
    </LoginPageDiv>
  );
});

export default LoginPage;
