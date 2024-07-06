
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { useAuth } from './store/auth';
const Login = () => {
  const navigate=useNavigate();
  const{storetoken}=useAuth()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const submit=async(e)=>{
       e.preventDefault();
       try{
          await axios.post("http://localhost:8000/login",{
            email,password
          })
          .then(res=>{
            if(res.data.msg==="exist"){
                alert("User Loggined")
                console.log(res.data.token)
                storetoken(res.data.token)
                navigate("/")
            }
            else if(res.data==="not exist"){
                 alert("Sign up first")
                 navigate("/signup")
            }
          })
          .catch(e=>{
            console.log(e)
          })
       }
       catch(e){
           console.log(e)
       }
    }
  return (
    <Wrapper>
      <h2 className='common-heading'>Login Page</h2>
    <div className='container'>
      <div className='contact-form'>
       <form method='POST' className='contact-inputs'>
         <input type='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'  required/>
         <input type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'  required/>
         <input type='submit' value= "Login" onClick={submit}/>
       </form>
       </div>
    </div>
    </Wrapper>
  )
}

export default Login


const Wrapper = styled.section`
    padding: 6rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 40rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          input[type="email"],
      input[type="password"] {
        text-transform: none; 
      }
          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;


