import { useFormik } from "formik";
import Link from "next/link";
import ErrorMsg from "./error-msg";
import { registerSchema } from "./validation-schema";
import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [data , setData] = useState({username : "" , email: "" , password : ""});

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(data)
    try{
    const res  = await axios.post("http://localhost:5000/api/user/register" , data);
    console.log("resp:" , res.data);
    window.location.href = "/login";
    
    }catch(err){
      console.log("err" , err)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Username <span>**</span>
        </label>
        <input
          id="username"
          value={data.username}
          onChange={e => setData({...data , username : e.target.value})}
          
          placeholder="Enter Username"
          type="text"
        />
        

        <label htmlFor="email-id">
          Email Address <span>**</span>
        </label>
        <input
          id="email"
          value={data.email}
          onChange={e => setData({...data , email : e.target.value})}
          
          placeholder="Email address..."
          type="email"
        />
        

        <label htmlFor="pass">
          Password <span>**</span>
        </label>
        <input
          id="pass"
          name="password"
          value={data.password}
          onChange={e => setData({...data , password : e.target.value})}
          
          type="password"
          placeholder="Enter password..."
        />
        

        <div className="mt-10"></div>
        <button type="submit" className="os-btn w-100">Register Now</button>
        <div className="or-divide">
          <span>or</span>
        </div>
        <Link href="/login">
          <a className="os-btn os-btn-black w-100">login Now</a>
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
