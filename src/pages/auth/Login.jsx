import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { doc, getDoc } from 'firebase/firestore';
import { selectPreviousURL } from '../../redux/slice/cartSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate=useNavigate()
  const saveurl=useSelector(selectPreviousURL)
  let redirectURL=()=>{
    if(saveurl.includes('/cart')){
        return navigate('/cart')
    }
    else(navigate('/'))
   
}
  let loginUser=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth,email,password)
    .then(async(userCredential) => {
          const user = userCredential.user;
         const ref= doc(db,"users",user.uid)
         const docSnap=await getDoc(ref)
        let role=docSnap.data().role
        if(role=="admin")
          navigate('/admin')
        else if(role=="user"){
          redirectURL()
        }
        
         setIsLoading(false)
         toast.success("login succssfully")
          
      })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
    });
  }

  const provider = new GoogleAuthProvider();
  let signInWithGoogle=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
         const user = result.user;
          toast.success("login success")
          // navigate('/')
          redirectURL()
    }).catch((error) => {
        toast.error(error.message)
    });
  }
  return (
    <>
    {isLoading&&<Loader/>}
    <div class="card mt-5">
      <div className='card-body row'>
      <div className='col-4'>
      <img src={require('../../assets/login.png')} alt="Title" style={{height:"200px"}}/>
      </div>
      <div class="col-6">
        <h1>Login User</h1><hr/>
      <form onSubmit={loginUser}>
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
            <div class="d-grid gap-2 mt-2">
              <button type="submit" name="" id="" class="btn btn-primary">Login</button>
            </div>
            </form>
            <p className='m-2'>------Or------</p>
            <div class="d-grid gap-2">
              <button type="submit" name="" id="" class="btn btn-danger" onClick={signInWithGoogle}>Login with Google</button>
            </div>
          
          <span>
            Create an account?
            <Link to="/register">Sign Up</Link>
          </span>
      </div>
    </div>
    </div>
      
  </>
  )
}

export default Login
