import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../..";
import { loginEmailPassword, AuthForm, createUser, signOutButton } from "../../../api/auth";
import { auth } from "../../../firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RectangleButton, { RectBut } from "../../buttons/rectangle-button";

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
  margin-top: 15px;
  padding-left: 10px;
  font-family: "Signika";
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
    padding-left: 15px;
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
    font-family: "Signika";
    font-size: 50px;
    border-radius: 2px "solid";
    border-color: green;
    margin-bottom: 50px;
  }
  button {
    margin-top: 30px;
}

svg {
  position: relative;
  bottom: 36px;
  left: 265px;
}
form {
  width: 80%;
}
`;

const LoginPage = observer(() => {
  const { userStore } = useContext(Context);


  const { push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<AuthForm>({
    email: "",
    password: "",
  });
  // const dispatch = useDispatch();

  useEffect(() => {
    setForm({ email, password });
  }, [email, password]);

  useEffect(() => {
    console.log(userStore._isAuth);
  }, [userStore.getIs]);

  const handleLogin = () => {
    loginEmailPassword({ email, password })
      .then((usr) => {
        // dispatch(loginTrue(true));
        // userStore.setIsAuth(true);
        // userStore.setUser(usr);
        push("/home");
      });
  };

  useEffect(() => {
    console.log(userStore._user);
  }, [userStore._user]);
  return (
    <LoginPageDiv>
      <LoginFormDiv>
        <h1>ChelFood</h1>
        <h2>Введите логин и пароль</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <LoginInput type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
          <LoginInput type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" ></LoginInput>
          <VisibilityIcon fontSize="medium" />
        </form>

        <RectBut size="md" title="Log In" onClick={() => {
          handleLogin();
        }}>
          Log In
        </RectBut>
        <h2>
          или <Link to="/registration" className="router-link"> зарегестрируйтесь </Link>
        </h2>
      </LoginFormDiv>
    </LoginPageDiv>
  );
});

export default LoginPage;