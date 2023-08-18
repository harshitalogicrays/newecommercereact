import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{isLoggedIn:false , email:null, userName:null,userID:null,role:null},
    reducers:{
        LoginUser(state,action){
            const {email,userID,userName,role}=action.payload
            state.isLoggedIn=true
            state.email=email
            state.userID=userID
            state.userName=userName
            state.role=role
        },
        LogoutUser(state,action){
            state.isLoggedIn=false
            state.email=null
            state.userID=null
            state.userName=null
            state.role=null
        }
    }
})
export const {LoginUser,LogoutUser}=authSlice.actions
export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectEmail=state=>state.auth.email
export const selectUserName=state=>state.auth.userName
export const selectUserID=state=>state.auth.userID
export const selectRole=state=>state.auth.role
export default authSlice








