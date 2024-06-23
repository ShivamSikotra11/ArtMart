import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgClose, CgMenu } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

const Nav = () => {
  const { total_items } = useCartContext();
  const { isLoggedIn, getLogOut } = useUserContext();

  const [menuIcon, setMenuIcon] = useState(false);

  useEffect(() => {
    // console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <NavWrapper>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link home-link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li className="cp navbar-link">
              <NavLink
              to="/profile"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
                {(JSON.parse(localStorage.getItem("StoreUser")).name).toUpperCase()}
            </NavLink>
              </li>
              <li className="cp navbar-link" onClick={() => getLogOut()}>
                SIGN OUT
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/sign-in"
                className="navbar-link"
                onClick={() => setMenuIcon(false)}
              >
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  .cp {
    cursor: pointer;
  }

  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;

    .navbar-link {
      display: inline-block;
      text-decoration: none;
      font-size: 1.8rem;
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.black};
      transition: color 0.3s linear;

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }

  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }

  .close-outline {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }

    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s linear;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 0.3s linear;

      .navbar-link {
        font-size: 2.8rem; /* Adjust font size as needed */
      }
    }
  }
`;

export default Nav;
