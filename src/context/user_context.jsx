import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducers/userReducer";
import { useState } from "react";
import axios from 'axios';

const UserContext = createContext();

const initialState = {
  snackbar:{open:false,message:""},
  isLoggedIn:false,
};


export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegister = async (formData,redirect) => {
    try {
      const response = await axios.put(`https://test-06k9.onrender.com/register?referral_code=${formData.referralCode}`, {
        name:formData.firstName + " " + formData.lastName,
        email: formData.email,
        hashed_password: formData.password,
      }, {
        headers: {
          'accept': 'application/json',
          'store-name': 'shivam'
        }
      });
      const { userId,name,referral_code} = response.data;
      dispatch({type:"SET_SNACKBAR",payload:[true,`Your userID is ${userId}(Keep Remember)`]})
      dispatch({type:"ALTER_LOGIN",payload:{userId,password:formData.password,name,referral_code}});
      redirect("/"); 
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('Registration failed');
    }
  };
  
  const handleLoginSubmit = async (formData, redirect) => {
    try {
      const userId = formData.get('userId');
      const password = formData.get('password');
      const response = await axios.get(`https://test-06k9.onrender.com/user/${userId}`, {
        headers: {
          'accept': 'application/json',
          'store-name': 'shivam',
          'hashed_password':password,
        }
      });
      const { name,referral_code } = response.data;
      // console.log(response);
      dispatch({type:"SET_SNACKBAR",payload:[true,`Welcome again ${name}`]})
      dispatch({type:"ALTER_LOGIN",payload:{userId,password,name,referral_code}})
      redirect("/"); 
    } catch (error) {
      dispatch({ type: "SET_SNACKBAR", payload: [true, error.response.data] });
    }
  };
  
  const AccountDelete = async (user, redirect) => {
    try {
       
      const response = await axios.delete(`https://test-06k9.onrender.com/user/${userId}`, {
        headers: {
          'accept': 'application/json',
          'store-name': 'shivam',
          'hashed_password':user.hashed_password,
        }
      });
      dispatch({type:"SET_SNACKBAR",payload:[true,`Your account has been deleted successfully`]})
      redirect("/"); 
    } catch (error) {
      dispatch({ type: "SET_SNACKBAR", payload: [true, error.response.data] });
    }
  };
  const getUserAPI = async (userId,password) => {
    try {
       
      const response = await axios.get(`https://test-06k9.onrender.com/user/${userId}`, {
        headers: {
          'accept': 'application/json',
          'store-name': 'shivam',
          'hashed_password':password,
        }
      });
      return response.data;
      // console.log(response);
      // dispatch({type:"SET_SNACKBAR",payload:[true,`Your account has been deleted successfully`]})
      // redirect("/"); 
    } catch (error) {
      console.log(error);
      // dispatch({ type: "SET_SNACKBAR", payload: [true, error] });
    }
  };

  const getSnackClose = () =>{
    dispatch({ type: "SET_SNACKBAR", payload: [false, ""] });
  }
  const getSnackOpen = (msg) =>{
    dispatch({ type: "SET_SNACKBAR", payload: [true, msg] });
  }

  const getLogin = (user) => {
    dispatch({ type: "ALTER_LOGIN",payload:user });
  }
  const getLogOut = () => {
    dispatch({ type: "ALTER_LOGIN" });
  }

  const getUser = () => {
    const storedUser = localStorage.getItem("StoreUser");
    return storedUser ? JSON.parse(storedUser) : null;
  }

  return (
    <UserContext.Provider
      value={{
        ...state,handleRegister,getSnackClose,handleLoginSubmit,getLogOut,getLogin,getUser,getSnackOpen,AccountDelete,getUserAPI
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
