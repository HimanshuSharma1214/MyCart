import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { useAuth } from './store/auth';
const Signup = () => {
  const{storetoken}=useAuth()
  const navigate=useNavigate();
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [username,setusername]=useState()
    const [mobile,setmobile]=useState()
    const [address,setaddress]=useState()

    const submit=async(e)=>{
      
       e.preventDefault();
       try{
          await axios.post("http://localhost:8000/",{
            email,password,username,mobile,address
          })
          .then(res=>{
            console.log(res.data.token);
            if(res.data==="exist"){
                alert("Already in Database")
                navigate("/login")
            }
            else if(res.data.msg==="not exist"){
              alert("Registeration Successfull")
              storetoken(res.data.token)
                 navigate("/login")
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
      <h2 className="common-heading">SignUp page</h2>
            <div className="container">
                <div className="contact-form">
                    <form action="POST" className="contact-inputs">          
                       <input type="text" placeholder="Username" name="username" required  onChange={(e)=>{setusername(e.target.value)}} />    
                        <input type="email" name="Email"  placeholder="Email"   required  onChange={(e)=>{setEmail(e.target.value)}} />
                        <input type="password" placeholder="password" name="password" required  onChange={(e)=>{setPassword(e.target.value)}} />
                        <input type="text" placeholder="Mobile" name="Mobile" required  onChange={(e)=>{setmobile(e.target.value)}} />
                        <input type="text" placeholder="Address" name="Address" required onChange={(e)=>{setaddress(e.target.value)}} />
                        <input type="submit"  value="Register" onClick={submit} />
                    </form>
                </div>
            </div>
    </Wrapper>
  )
}

export default Signup
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
           input[type="text"],
      input[type="email"],
      input[type="password"] {
        text-transform: none; /* Ensure text is not transformed */
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


