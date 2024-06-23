import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/productContext.jsx";
import { FilterContextProvider } from "./context/filter_context.jsx";
import CartContextProvider from "./context/cart_context.jsx";
import { UserContextProvider } from "./context/user_context.jsx";
import { BrowserRouter as Router} from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <AppProvider>
        <FilterContextProvider>
          <CartContextProvider>
          {/* <Router> */}
            <App />
          {/* </Router> */}
          </CartContextProvider>
        </FilterContextProvider>
      </AppProvider>
    </UserContextProvider>
  </React.StrictMode>
);
