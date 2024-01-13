import React from 'react'
import { useState } from 'react';

export default function Register() {
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  async function register(e){
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:4000/register",{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'content-type':'application/json'},
    });
    console.log(res)
    if(!res.ok){
      throw new Error(`Http error`);
    }
    const data = await res.json();
    alert(data.message);
    }
    catch(e){
      alert(`Registration failed`)
    }
   

  }
  return (
    <form onSubmit={register} className='register'>
      <h1>Register</h1>
      <input type="text" 
      placeholder='Username' 
      value={username}
      onChange={e=>{
        setUsername(e.target.value)
      }}/>

      <input type="text" 
      placeholder='Password' 
      value={password}
      onChange={e=>{
       setPassword( e.target.value)
      }}/>
      <button>Register</button>
    </form>
  )
}
