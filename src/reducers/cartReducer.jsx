const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, color, amount, product } = action.payload;
      let existingProduct = state.cart.find((item) => item.id === id + color);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === id + color) {
              let newAmount = item.amount + amount;
              if (newAmount > item.max) {
                newAmount = item.max;
              }
              return { ...item, amount: newAmount };
            } else {
              return item;
            }
          }),
        }
      }
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,//as if key,value same we can write like this
        amount,
        image: product.image[0].url,
        price:product.price,
        max:product.stock,
      }
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      }
    case "REMOVE_ITEM": 
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case "CLEAR_CART": 
      return {
        ...state,
        cart: [],
      }
    case "DECREASE_AMOUNT":
      let tempCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      }).filter((item) => item.amount !== 0);
      return {
        ...state,
        cart: tempCart,
      }
    case "INCREASE_AMOUNT":
      let tempCart1 = state.cart.map((item) => {
        if (item.id === action.payload && item.amount + 1 < item.max) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart1,
      }
    case "CART_TOTAL_PRICE_ITEM":
      let totalItems = 0, totalPrice;
      if(state.cart){
        totalItems = state.cart.map((p) => p.amount).reduce((c, s) => c + s, 0);
        totalPrice = state.cart.reduce((initial,cur) => initial + cur.price*cur.amount, 0);
      }
      return {
        ...state,
        total_price:totalPrice,
        total_items:totalItems,
      }
    default:
      return state;
  }
};
export default cartReducer;
