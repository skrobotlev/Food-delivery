import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loginEmailPassword, AuthForm, createUser } from "../../../api/auth";
import RectangleButton from "../../buttons/rectangle-button";

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
    padding-left: 42px;
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
  button {
    margin-top: 30px;
  }
`;

interface RegisterForm extends AuthForm {
  name: string;
  lastName: string;
}

const RegisterPage = () => {
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
  }, [email, password]);

  return (
    <RegisterPageDiv>
      <RegisterFormDiv>
        <h1>ChelFood</h1>
        <h2>Welcome! Enter your details</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <RegisterInput type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email" />
          <RegisterInput type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" />
          <RegisterInput type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="name" />
          <RegisterInput type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="lastname" />
        </form>

        <RectangleButton size="md" title="Register" onClick={() => createUser(form)} />
        {/* <button onClick={() => loginEmailPassword(form)}>login</button> */}
        {/* <button onClick={() => createUser(form)}>register</button> */}
      </RegisterFormDiv>
    </RegisterPageDiv>
  );
};

export default RegisterPage;
