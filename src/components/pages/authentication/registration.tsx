import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { loginEmailPassword, AuthForm, createUser, createFullUser } from "../../../api/auth";
import { auth } from "../../../firebase";
// import { loginTrue, setUser } from "../../../redux/actions";
import RectangleButton, { RectBut } from "../../buttons/rectangle-button";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const RegisterPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const RegisterInput = styled.input`
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

const RegisterFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  h2 {
    width: 80%;
    text-align: center;
  }
  button {
    margin-top: 30px;
  }
  form {
    width: 80%;
  }
`;

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

const RegistrationPage = observer(() => {
  // const dispatch = useDispatch();
  const { userStore } = useContext(Context);
  const { push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
    lastName: ""
  });

  useEffect(() => {
    setForm({ email, password, name, lastName });
  }, [email, password, name, lastName]);

  useEffect(() => {
    console.log(userStore._user);
  }, [userStore._user]);

  // console.log(typeof form);

  const handleRegister = () => {
    // debugger;
    createFullUser(form)
      .then((usr) => {
        console.log(usr, "user from registration");
        // userStore.setIsAuth(true);
        // userStore.setUser(usr);
        // console.log(user._user);
        push("/home");
      });
  };


  return (
    <RegisterPageDiv>
      <RegisterFormDiv>
        <h1>ChelFood</h1>
        <h2>Добро пожаловать! Представьтесь, пожалуйста</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <RegisterInput type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
          <RegisterInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
          <RegisterInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Repeat password" />
          <RegisterInput type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
          <RegisterInput type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Lastname" />
        </form>

        <RectBut size="md" title="Register" onClick={() => handleRegister()}>
          Registration
        </RectBut>
        <h2>
          или <Link to="/login" className="router-link"> войдите </Link>
        </h2>
      </RegisterFormDiv>
    </RegisterPageDiv>
  );
});

export default RegistrationPage;