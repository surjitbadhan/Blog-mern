import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {userInfo, setUserinfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data)
       setUserinfo(data.username)
      });
    });
  }, []);

  function logout(){
    localStorage.setItem('token',"")
    setUserinfo(null)
  }

  return (
    <header>
      <Link to={"/"} className="logo">
        MyBlog
      </Link>
      <nav>
        {userInfo && (
          <>
            <Link to={'/createpost'}>Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userInfo && (
          <>
            <Link to="/login">Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
