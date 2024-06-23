const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      // console.log(action.payload);
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };
    case "SORTING_PRODUCTS":
      let newSortData;
      const { filter_products, sorting_value } = state;
      let tempSortData = [...filter_products];
      const sortingProducts = (a, b) => {
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        } else if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        } else if (sorting_value === "lowest") {
          return a.price - b.price;
        } else if (sorting_value === "highest") {
          return b.price - a.price;
        }  
      }
      newSortData=tempSortData.sort(sortingProducts); 
      return {
        ...state,
        filter_products: newSortData,
      };
    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          // New Thing
          [name]: value, 
          // New Thing
        }
      };
    case "FILTER_PRODUCTS":
      let {filters, all_products } = state;
      let tempFilterProducts = [...all_products];
      const { text, category,company,color ,price} = filters;
      if (text) {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.name.toLowerCase().includes(text);
        })
      }
      if (category && category !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.category === category;
        })
      }
      if (company && company !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.company.toLowerCase() === company.toLowerCase();
        })
      }
      if (color && color !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.colors.includes(color);
        })
      }
      if (price === 0) {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.price === price;
        })
      }
      else{
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.price <= price;
        })
      }
      return {
        ...state,
        filter_products: tempFilterProducts
      }
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text:"",
          category:"all",
          company:"all",
          color: "all",
          price: state.filters.maxPrice,
        }
      }
    default:
      return state;
  }
};

export default filterReducer;
