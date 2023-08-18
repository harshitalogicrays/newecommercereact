import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { selectEmail, selectRole } from '../../redux/slice/authSlice'
import Login from '../../pages/auth/Login'

const Admin = () => {
    let email=useSelector(selectEmail)
    let role=useSelector(selectRole)
  return (
    <div>
        {(email=="admin@gmail.com" && role=="admin")?
      <div class="container-fluid">
    <div class="row">
        <div class="col-2 bg-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
               
                <a href="/" class="d-block p-3 link-dark text-decoration-none text-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <i class="bi-person-circle h2"></i><br/>
                  Dashboard
                </a>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li class="nav-item">
                        <Link to='addproduct' class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">Add Product</Link>
                        
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" to='viewproducts'>
                        View Products
                        </Link>
                    </li>
                    <li>
                        <a href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                           View Users
                        </a>
                    </li>
                    <li>
                    <Link class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" to='orders'>
                        View Orders
                        </Link>
                    </li>
                </ul>
              
            </div>
        </div>
        <div class="col-9 offset-1 p-3">
            <Outlet/>
        </div>
    </div>
</div>
:
                    <Login/>
                }
    </div>
  )
}

export default Admin
