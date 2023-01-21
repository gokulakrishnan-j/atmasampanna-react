import React, { useState } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { API } from '../../global/connect'
import './Signup.css' 
import { useNavigate } from 'react-router-dom'

//using yup.js for deep validation
const validationSchema = yup.object({
    username:yup
    .string()
    .required("Fill the name"),
    email:yup
    .string()
    .email("Enter valied email")
    .required("Fill the email"),
    password:yup
    .string()
    .min(8,"Need a longer password")
    .max(14,"Too much password")
    .required("Fill the password")
})
function Signup() {
    const navigate = useNavigate()

    // confirm password
    const [confirmPassword,setConfirmPassword] = useState('')

    //using formik for validation
    const {handleSubmit,handleChange,handleBlur,touched,values,errors} = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:""
        },
        validationSchema:validationSchema,
        onSubmit:(values)=>{

          if(values.password === confirmPassword){
           fetch(`${API}/user/signup`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{'Content-Type':'application/json'}
           })
           .then((signup)=>signup.ok ? navigate('/login') : alert("Email already exists"))
          }
          else{
            alert("Your passwor and confirm password not matched")
          }
       
        }
    })
  return (
// singup component
    <div className='signup'>

        <div className='signupBox'>

        <form onSubmit={handleSubmit}>

            <div>

        <input 
         className='inputForSignup'
        name='username' 
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder='Name'/>
      
        <div>

        {touched.username && errors.username ? errors.username : null}
        </div>
        </div>

        <div>
            
         <input 
          className='inputForSignup'
        name='email' 
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder='Email'/>
        <div>
        {touched.email && errors.email ? errors.email : null}
        </div>
        </div>

        <div>
         <input 
          className='inputForSignup'
        name='password' 
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder='Password'/>
        
        <div>

        {touched.password && errors.password ? errors.password : null}

        </div>
        </div>

        <div>
         <input 
          className='inputForSignup'
        onChange ={(e)=>setConfirmPassword(e.target.value)}
        type="text"
        placeholder='Confirm Password'
        
        />
        
        </div>

        <button className='signupButton' type='submit'>Register</button>

        </form>
        <div><p style={{color:"#bb4415"}} >Already have an account? <span className="navigateToLoginPage" onClick={()=>navigate('/login')}>Login</span></p></div>
        </div>
        
    </div>
  )
}

export default Signup