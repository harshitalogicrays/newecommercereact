import React, { useEffect } from 'react'
import Loader from '../Loader';
import useFetchCollection from '../../customhooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, store_product } from '../../redux/slice/ProductSlice';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { selectFilteredProducts } from '../../redux/slice/filterSlice';

const ViewProducts = () => {
  let {data,isLoading}=useFetchCollection("products");
  const dispatch=useDispatch()
  const products=useSelector(selectProducts)
  const filterProducts=useSelector(selectFilteredProducts)
  useEffect(()=>{
    dispatch(store_product({products:data}))
  },[data,dispatch])
  let handleDelete=(id,imageURL)=>{
    let cb=window.confirm("are you sure you want delete the product??")
    if(cb)
    { 
      deleteProduct(id,imageURL)
    }
  }
   let deleteProduct=async(id,imageURL)=>{
    try{
    await deleteDoc(doc(db,"products",id))
    const sr=ref(storage,imageURL)
    await deleteObject(sr)
    toast.success("product deleted")
    }
    catch(error){
      toast.error(error.message)}
  }

  return (
    <div>
    {/* {isLoading&&<Loader/>} */}
    <h1>All Products</h1><br></br>
  
    <div class="table-responsive">
      <table class="table table-striped table-hover	table-borderless table-primary align-middle">
          <thead class="table-light">
              <tr>
                  <th>Sr. No</th>
                  <th>Image</th>
                  <th>Name</th>            
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
                {filterProducts.map((product,index)=>
                <tr key={index}>
                  <td>{index+1}</td>
                  <td><img src={product.imageURL} class="img-fluid rounded-top" alt="" style={{width:'100px',height:'100px'}}/></td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>                 
                  <td>
                    <Link type="button" class="btn btn-success me-2" to={`/admin/editproduct/${product.id}`}> <FaEdit/></Link>
                    <button type="button" class="btn btn-danger" onClick={()=>handleDelete(product.id,product.imageURL)}> <FaTrashAlt/></button>
                    
                  </td>
                </tr>
                )}
              </tbody>
      </table>
          </div> 
    
  </div>
  )
}

export default ViewProducts
