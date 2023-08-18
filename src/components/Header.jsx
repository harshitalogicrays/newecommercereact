import { onAuthStateChanged, signOut } from 'firebase/auth';
import styles from './header.module.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaUserAlt,FaShoppingCart} from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, LogoutUser, selectRole, selectUserName } from '../redux/slice/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import { ShowonLogin, ShowonLogout } from './Hiddenlink';
import { toast } from 'react-toastify';
import { selectCartItems } from '../redux/slice/cartSlice';
import { FILTER_BY_SEARCH, filter_by_search, selectFilteredProducts} from '../redux/slice/filterSlice';
import { selectProducts, store_product } from '../redux/slice/ProductSlice';
import useFetchCollection from '../customhooks/useFetchCollection';
const Header = () => {
  const {data,isLoading}=useFetchCollection("products")
  const dispatch=useDispatch()
  const username=useSelector(selectUserName)
  const userrole=useSelector(selectRole)
  const cartItems=useSelector(selectCartItems)
  const [search,setSearch]=useState('')
  const products=useSelector(selectProducts)

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if (user) {
              const uid = user.uid;
              const ref= doc(db,"users",uid)
              const docSnap=await getDoc(ref)
             let role=docSnap.data().role
              let username=user.email.slice(0,-10)
              if(role=="admin")
              dispatch(LoginUser({userID:uid,userName:username,email:user.email,role:"admin"}))
           else if(role=="user")
            dispatch(LoginUser({userID:uid,userName:username,email:user.email,role:"user"}))

          }
            else {
                dispatch(LogoutUser())
      }
    })
  },[dispatch,auth])

 
  useEffect(() => {
    dispatch(
      store_product({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
},[search,dispatch, products])


  let handleLogout=()=>{
    signOut(auth).then(() => {
      dispatch(LogoutUser())
      toast.success("logout successfully")
    }).catch((error) => {
        toast.error(error.message)
    });
  }

  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand><NavLink to='/' className={styles.navlink}>MyShop</NavLink></Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link><NavLink to='/' className={styles.navlink} >Home</NavLink></Nav.Link>
        <Nav.Link>About</Nav.Link>
      </Nav>
      <div className='col-3'>
      <input type="text" className='form-control' value={search} 
      onChange={(e)=>setSearch(e.target.value)}
      placeholder='search by name/category'/>
      </div>
      <Nav>

       {userrole!="admin"&& 
      <Nav.Link><NavLink to='/cart' className={styles.navlink}>Cart
      <FaShoppingCart size={25}/>
     <span class="badge rounded-pill text-bg-danger" 
     style={{position:'relative',top:'-10px'}}>{cartItems.length}</span>
      </NavLink>
        </Nav.Link> }
      </Nav>    
    <ShowonLogin>
        <Nav>
      {userrole=="user"&&
        <Nav.Link><NavLink to='/order-history' className={styles.navlink}>My Orders</NavLink>
        </Nav.Link>   } 
        <Nav.Link>
         <NavLink to='/' className={styles.navlink}>{username?`Welcome ${username}`:null}</NavLink>
        </Nav.Link>    
        <Nav.Link><NavLink to='/' className={styles.navlink} onClick={handleLogout}>Logout</NavLink>
        </Nav.Link>
      </Nav>
    </ShowonLogin>
    <ShowonLogout>
        <Nav>    
          <Nav.Link>
            <NavLink to='/register' className={styles.navlink}>Register</NavLink>
          </Nav.Link>
          <Nav.Link><NavLink to='/login' className={styles.navlink}>Login</NavLink> <FaUserAlt/>
          </Nav.Link>
        </Nav>
    </ShowonLogout>
       </Container>
  </Navbar>
  )
}

export default Header
