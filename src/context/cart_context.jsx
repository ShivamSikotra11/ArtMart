import React, { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/cartReducer';

const cartContext = createContext();
const initialItems = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  total_items:"",
  total_price:"",
  shipping_fees:50000,
};
const cartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialItems);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  }
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload:id });
  }
  const clearCart = () => {
    dispatch({type:"CLEAR_CART"})
  }
  const setDecrease = (id) => {
    dispatch({type:"DECREASE_AMOUNT",payload:id})
  }
  const setIncrease = (id) => {
    dispatch({type:"INCREASE_AMOUNT",payload:id})

  }

  // Adding cart to localStorage
  useEffect(() => { 
    dispatch({ type: "CART_TOTAL_PRICE_ITEM" });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);


  return (
    <cartContext.Provider value={{
      ...state, addToCart, removeItem, clearCart,setDecrease,setIncrease  
    }} >
      {children}
    </cartContext.Provider>
  )
}
export const useCartContext = () => {
  return useContext(cartContext);
}
export default cartProvider;