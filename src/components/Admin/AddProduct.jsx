import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { toast } from 'react-toastify'
import './progress.css';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slice/ProductSlice'
const initialState={
    id:'',name:'',price:'',imageURL:'',brand:'',category:'',desc:'',countInStock:0
}

const categories=[
    {id:1,name:'Electronics'},
    {id:2,name:'Cloths'},
    {id:3,name:'Grocery'},
    {id:4,name:'accessaries'},
    {id:5,name:'sports'},
]
const AddProduct = () => {
    let [product,setProduct]=useState({...initialState})
    let [isLoading,setIsLoading]=useState(false)
    let [uploadProgress,setUploadProgress]=useState(0)
    const navigate=useNavigate()
    const products=useSelector(selectProducts)
    const {id}=useParams()
    const ProductEdit=products.find((item)=>item.id==id)
    useEffect(()=>{
        if(id)
          setProduct(ProductEdit)
        else
          setProduct({...initialState})
    },[id])


    let handleInput=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

let handleImageChange=(e)=>{
  let file=e.target.files[0]
  const storageRef=ref(storage,`ecommerce-reactreduxfirebase/${Date.now()}${file.name}`)
  const uploadTask=uploadBytesResumable(storageRef,file)
  uploadTask.on("state_changed",(snapshot)=>{
    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
    setUploadProgress(progress)
  },(error)=>{toast.error(error.message)},
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setProduct({...product,imageURL:downloadURL})
    })
  }
  )
}
let handleProduct=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    if(!id){
    try{
        addDoc(collection(db,"products"),{
          name:product.name,
          price:product.price,
          imageURL:product.imageURL,
          category:product.category,
          desc:product.desc,
          brand:product.brand,
          countInStock:product.countInStock,
          createdAt:Timestamp.now().toDate()   
        })
        setIsLoading(false)
        toast.success('product added')
        navigate('/admin/viewproducts')
    }
    catch(error){
         setIsLoading(false)
        toast.error(error.message)
    }
  }
  else{
    if(product.imageURL!=ProductEdit.imageURL){
      const sr=ref(storage,ProductEdit.imageURL)
      deleteObject(sr) }
    try{
      setDoc(doc(db,"products",id),{
        name:product.name,
        price:product.price,
        imageURL:product.imageURL,
        category:product.category,
        desc:product.desc,
        brand:product.brand,
        countInStock:product.countInStock,
        createdAt:ProductEdit.createdAt,
        editedAt:Timestamp.now().toDate()   
      })
      setIsLoading(false)
      toast.success('product updated')
      navigate('/admin/viewproducts')
  }
  catch(error){
       setIsLoading(false)
      toast.error(error.message)
  }
  }
}
  return (
    <div>
        {isLoading && <Loader/>}
        <h1>{id?"Edit":"Add"} Product</h1>
        <hr/>
      <form onSubmit={handleProduct}>
        <div class="row">
        <div className='form-group col-6'>
            <label>Name</label>
            <input type="text" className='form-control' name="name" value={product.name}
            onChange={(e)=>handleInput(e)}/>
        </div>
        <div className='form-group col-6'>
            <label>Price</label>
            <input type="text" className='form-control' name="price"  value={product.price}
            onChange={(e)=>handleInput(e)}/>
        </div>
        </div>
        <div className='form-group'>
            <label>Brand</label>
            <input type="text" className='form-control' name="brand" value={product.brand}
            onChange={(e)=>handleInput(e)}/>
        </div>
        <div className='form-group'>
            <label>Image</label>
            * {uploadProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )} 
            <input type="file" className='form-control' accept="image/*" name="imageURL" onChange={(e)=>handleImageChange(e)}/>
            {/* {product.imageURL===''?null:<span>{product.imageURL}</span>} */}
        </div>
        <div className='form-group'>
            <label>Category</label>
            <select className='form-select' onChange={(e)=>handleInput(e)} name="category"
            value={product.category}>
                <option option="select">----choose Categoy--------</option>
                {categories.map((item,index)=><option key={index}>{item.name}                
                </option> )}
            </select>
        </div>
        <div className='form-group'>
            <label>countInStock</label>
            <input type="number" className='form-control' name="countInStock" value={product.countInStock}
            onChange={(e)=>handleInput(e)}/>
        </div>
        <div className='form-group'>
            <label>Description</label>
            <textarea className='form-control' name="desc" onChange={(e)=>handleInput(e)} value={product.desc}>{product.desc}</textarea>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" name="" id="" class="btn btn-primary mt-2">Save Product</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
