const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_SNACKBAR":
      return { ...state, snackbar: { open: action.payload[0], message: action.payload[1] } };
    case "ALTER_LOGIN":
      if(action.payload){
        const { userId } = action.payload;
        // console.log(action.payload);
        localStorage.setItem('StoreUser', JSON.stringify(action.payload));
        return { ...state,isLoggedIn:true };
      } else {
        localStorage.removeItem('StoreUser');
        return { ...state, isLoggedIn: false };
      }
    default:
      return state;
  }
};

export default userReducer;
 