import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import UploadProduct from "./UploadProduct";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/Header";
import SnackBar from "./components/SnackBar";
import Footer from "./components/Footer";
import { useUserContext } from "./context/user_context";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  const { getLogin, isLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("StoreUser")) {
      const user = JSON.parse(localStorage.getItem("StoreUser"));
      getLogin(user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <SnackBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload-product"
            element={
              <PrivateRoute>
                <UploadProduct />
              </PrivateRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
