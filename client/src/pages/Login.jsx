import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ redirect, setRedirect]= useState(false)
  const {setUserinfo}= useContext(UserContext)

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-type": "application/json" },
      });
      if (res.ok) {
        const token = await res.json();
        //console.log(token);
        localStorage.setItem('token',token);
        setUserinfo(token)
        setRedirect(true)
      } else {
        throw new Error("http erorr");
      }
    } catch (e) {
      alert(`Login failed`);
    }
  };

  if(redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
