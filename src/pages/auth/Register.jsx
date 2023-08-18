import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError]=useState({})
    let navigate=useNavigate()
    let registerUser=(e)=>{
        e.preventDefault()
        if(password !=cPassword){
            setError({pwderror:'Not Same'})
        }
        else{
            setError({pwderror:''})
            setIsLoading(true)
            createUserWithEmailAndPassword(auth,email,password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                const role="user"
                const ref=doc(db,"users",user.uid)
                await setDoc(ref,{email,password,role})         
                toast.success("User registered")
                setIsLoading(false)
                navigate('/')
              })
              .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
              });          
        }
    }
  return (
    <div>
    {isLoading&&<Loader/>}
    <div class="card mt-5">
      <div className='card-body row'>
      <div className='col-4'>
      <img src={require('../../assets/register.png')} alt="Title" style={{height:"200px"}}/>
      </div>
      <div class="col-6">
        <h1>Register User</h1><hr/>
      <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Email"
              required className='form-control mt-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required className='form-control mt-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required className='form-control mt-2'
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <span className='text-danger'>
                {error.pwderror?error.pwderror:null}</span>
                <br/>
            <button type="submit" className="btn btn-primary mt-2">
              Register
            </button>
          </form>
          <span>
            Already an account?
            <Link to="/login">Login</Link>
          </span>
      </div>
    </div>
    </div>
      
  </div>
  )
}

export default Register
