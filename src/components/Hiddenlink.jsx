import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/slice/authSlice"

export const ShowonLogin=({children})=>{
const isLoggedIn=useSelector(selectIsLoggedIn)
if(isLoggedIn)
    return children
else 
    return null
}

export const ShowonLogout=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(!isLoggedIn)
        return children
    else 
        return null
}