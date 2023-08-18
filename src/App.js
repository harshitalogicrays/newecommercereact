
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login'
import Admin from './components/Admin/Admin';
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
import ProductDetails from './components/Product/ProductDetails';
import Cart from './components/Cart';
import CheckoutDetails from './components/CheckoutDetails';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import OrderHistory from './components/OrderHistory';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
function App() {
  return (
    <>
    <ToastContainer autoClose={1000}/>
    <Header/>
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}>
          <Route path='' element={<Dashboard/>}/>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='editproduct/:id' element={<AddProduct/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='order-details/:id/:orderstatus' element={<OrderDetails/>}/>
      </Route>

      <Route path='/product-details/:id' element={<ProductDetails/>}/> 
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/order-history' element={<OrderHistory/>}/>
    </Routes>
    </div>
    </>
      );
}

export default App;
