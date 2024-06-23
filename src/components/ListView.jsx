import React,{useEffect} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useProductContext } from '../context/productContext';
import {  TextField, Typography, IconButton } from '@mui/material';

const ListView = ({ products }) => {
  const {getProducts,delProduct,isUploadLoading} = useProductContext(); 
  useEffect(() => {
    getProducts();
  }, [isUploadLoading]);
   
  const navigate = useNavigate();
  const handleUpdate = (curElem) => () => {
    console.log(curElem);
    navigate('/upload-product', { state: curElem });
  };
  const handleDel = (curElem) => () => {
    console.log(curElem);
    delProduct(curElem.id);
  };
  
  if(isUploadLoading){
    return <Typography variant="h4" gutterBottom>...Loading</Typography>;
  }

  return (
    <Wrapper className="section">
      <div className="container grid">
        {products.map((curElem) => {
          const { id, images, description } = curElem;
          return (
            <div key={id} className="card grid grid-two-column">
              <figure>
                <img src={images[0]} alt={`Product ${id}`} />
              </figure>

              <div className="card-data">
                <p>{description}</p>
                <div className='cf'>
                  {/* <NavLink to="" className="btn-main"> */}
                  <Button className="btn" onClick={handleUpdate(curElem)}>Update</Button>
                  {/* </NavLink> */}
                  <NavLink to="" className="btn-main">
                    <Button className="btn" onClick={handleDel(curElem)} >Delete</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default ListView;

const Wrapper = styled.section`
  padding: 9rem 0;
  .cf{
    display:flex;
    // border:2px solid red;
    justify-content:space-evenly;
    margin:0;
  }
  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    border: 0.1rem solid rgb(170 170 170 / 40%);

    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem 0;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(98 84 243);

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }

    .btn-main .btn:hover {
      color: #fff;
    }
  }
`;