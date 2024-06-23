// Create a Context
// A Provider
// Consumer => useContext Hook

import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/productReducer";
import { useUserContext } from "./user_context";

const AppContext = createContext();

const API = "https://test-06k9.onrender.com/product";
// axios returns promise

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  isUploadLoading: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getUser,getSnackOpen } = useUserContext();
  const user = getUser();
  // console.log(user);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
       
      const res = await axios.get(`${API}/${user.userId}`, {
        headers: {
          'accept': 'application/json',
          'store-name': 'shivam',
          'hashed_password': user.password
        }
      });
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };
  // const uploadProducts = async (description, pId, images, user) => {
  //   dispatch({ type: "ALTER_UL" });
  
  //   if (!Array.isArray(images)) {
  //     console.error('Images is not an array:', images);
  //     dispatch({ type: "ALTER_UL" });
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append('description', description);
  //   formData.append('productId', pId);
  
  //   images.forEach((image, index) => {
  //     if (image.file) {
  //       formData.append('images', image.file); // Append the actual file
  //     } else if (image.url) {
  //       formData.append('imageUrls', image.url); // Append the existing image URL
  //     }
  //   });
  
  //   try {
  //     const response = await axios.put(`https://test-06k9.onrender.com/product/${user.userId}`, formData, {
  //       headers: {
  //         'accept': '*/*',
  //         'store-name': 'shivam',
  //         'hashed_password': user.password,
  //         'Content-Type': 'multipart/form-data',
  //       }
  //     });
  //     getSnackOpen("Product Uploaded");
  //     dispatch({ type: "ALTER_UL" });
  //   } catch (error) {
  //     console.error('Error uploading product:', error.message);
  //     dispatch({ type: "ALTER_UL" });
  //   }
  // };

  const uploadProducts = async (description, pId, images, user) => {
    dispatch({ type: "ALTER_UL" });
  
    const formData = new FormData();
    formData.append('description', description);
    formData.append('productId', pId);
  
    images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);
      }
    });
  
    try {
      const response = await axios.put(`https://test-06k9.onrender.com/product/${user.userId}`, formData, {
        headers: {
          'accept': '*/*',
          'store-name': 'shivam',
          'hashed_password': user.password,
          'Content-Type': 'multipart/form-data',
        }
      });
      getSnackOpen("Product Uploaded");
      dispatch({ type: "ALTER_UL" });
    } catch (error) {
      console.error('Error uploading product:', error.message);
      dispatch({ type: "ALTER_UL" });
    }
  };
  
  
  
  const delProduct = async (pId) => {
    dispatch({ type: "ALTER_UL" });
    try {
      
      const res = await axios.delete(`${API}/${user.userId}/${pId}`, {
        headers: {
          'accept': 'application/json',
          'store-name': 'shivam',
          'hashed_password': user.password
        }
      });
      dispatch({ type: "ALTER_UL" });
      // console.log(res);
    } catch (error) {
      dispatch({ type: "SET_LOADING" });
      console.error("Error fetching products:", error);
      dispatch({ type: "API_ERROR" });
    }
  };
  
  // console.log("pro:", state);
  return (
    <AppContext.Provider value={{ ...state, getSingleProduct,uploadProducts,getProducts,delProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hooks
const useProductContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useProductContext };
export default AppContext;
