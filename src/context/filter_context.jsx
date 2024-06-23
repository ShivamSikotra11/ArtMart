import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducers/filterReducer";
import { useState } from "react";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: false,
  sorting_value: "lowest",
  filters:{
    text:"",
    category:"all",
    company:"all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  // console.log(products);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortVal, setSortVal] = useState();

  // Set the grid view
  const setGridView = useCallback(() => {
    dispatch({ type: "SET_GRID_VIEW" });
  }, []);

  const setListView = useCallback(() => {
    dispatch({ type: "SET_LIST_VIEW" });
  }, []);

  const sorting = useCallback((e) => {
    let userValue = e.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  }, []);

  const updateFilterValue = (e) => {
    let name=e.target.name;
    let value = e.target.value;
    return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}})
    
  }

  const clearFilters = () => { 
    setSortVal("none");
    dispatch({type:'CLEAR_FILTERS'})
  }
 
  // To Sort the products
  useEffect(() => {
    dispatch({type:"SORTING_PRODUCTS"});
  }, [state.sorting_value, products]);

   
  // To Filter Data
  useEffect(() => {
    dispatch({type:"FILTER_PRODUCTS"});
  }, [state.filters,products]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  // aaya aetle add karyu kemke jo [] rakhu to tyare fetch thay jyare aa call thase & aapde bija koi page ma aa products nai madi sake
  // So mane aem joye ke jo products ne access kare to fetch thay to [] ni andar products lakhvu padse
  // Basically products par dependent thai jase

  return (
    <FilterContext.Provider
      value={{
        ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters,sortVal, setSortVal
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export const useFilterContext = () => {
  return useContext(FilterContext);
};
