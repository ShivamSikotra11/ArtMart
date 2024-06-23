import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to={"/"} className="logo">
        Share N Shop
        {/* <img src="logo-f.png" width="130" alt="" /> */}
      </NavLink>
      <Nav></Nav>
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: rgb(98 84 243);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 2.4rem;
  font-weight: 500;
  // text-transform: uppercase;
  .logo{
    color: #e6e6fa;
  }
`;

export default Header;
