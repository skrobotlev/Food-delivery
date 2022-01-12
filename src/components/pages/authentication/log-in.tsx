import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loginEmailPassword, AuthForm, createUser } from "../../../api/auth";
import RectangleButton from "../../buttons/rectangle-button";

const LoginPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
   width: 100%;
  height: 100vh;
`;

const LoginInput = styled.input`
  margin: 10px;
  display: flex;
  width: 100%;
  max-height: 64px;
  padding: 15px;
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
  padding-left: 38px;
  padding-right: 40px;
  transition: 0.5s padding-left;
  &:focus {
    padding-left: 42px;
  }
`;

const LoginFormDiv = styled.div`
    display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
      /* margin-bottom: 100px; */
      font-weight: bold;
      color: green;
      font-family: "Signika";
font-size: 50px ;
border-radius: 2px "solid";
border-color: green;
margin-bottom: 50px;
  }
  h2 {
    font-size: 18px;
  }
`;

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState<AuthForm>({
        email: "",
        password: "",
    });

    useEffect(() => {
        setForm({ email, password });
    }, [email, password]);

    return (
        <LoginPageDiv>
            <LoginFormDiv>
                <h1>ChelFood</h1>
                <h2>Enter your login and password</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <LoginInput type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email" />
                    <LoginInput type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" />
                </form>

                <h2>or register</h2>
                <RectangleButton size="md" title="Log In" onClick={() => loginEmailPassword(form)} />
                {/* <button onClick={() => loginEmailPassword(form)}>login</button> */}
                <button onClick={() => createUser(form)}>register</button>
            </LoginFormDiv>
        </LoginPageDiv>
    );
};

export default LoginPage;

// export const testLoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [form, setForm] = useState<AuthForm>({
//         email: "",
//         password: "",
//     });

//     useEffect(() => {
//         setForm({ email, password });
//     }, [email, password]);

//     return (
//         <LoginPageDiv>
//             <h2>Member login</h2>
//             <LoginInput
//                 type="email"
//                 placeholder="Enter your email address"
//             />

//             <LoginInput
//                 type="password"
//                 placeholder="Password"
//             />
{/* <button onClick={() => loginEmailPassword(form)}>login</button> */ }
{/* <button onClick={() => createUser(form)}>register</button> */ }
//             <button className="btn" type="submit" />
//         </LoginPageDiv>
//     );
// };
