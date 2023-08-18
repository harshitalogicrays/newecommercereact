import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const useFetchDocument = (collectionName,documentID) => {
    const [document,setDocument]=useState(null)
    const getDocument=async()=>{
       const docref = doc(db,collectionName,documentID)
       const docSnap=await getDoc(docref)
       if(docSnap.exists){
        const obj={
            id:documentID, ...docSnap.data()
        }
        setDocument(obj)
       }
       else{
        toast.error("Document not found")
       }
    }
useEffect(()=>{
    getDocument()
})
  return {document}
}

export default useFetchDocument
