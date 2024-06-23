import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";
import { Button } from "../styles/Button";
import {NavLink} from "react-router-dom";

const Sort = () => {
  const { filter_products=[] , grid_view, setGridView, setListView, sorting,sortVal, setSortVal } =
    useFilterContext();
  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}
      {/* <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}
        >
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : " sort-btn"}
          onClick={setListView}
        >
          <BsList className="icon" />
        </button>
      </div> */}
      {/* 2nd column  */}
      <div className="product-data">
        <p>{`${filter_products.length} Products Available`}</p>
      </div>

      {/* 3rd column  */}
      {/* <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            value={sortVal}
            onChange={(e) => {
              sorting(e);
              setSortVal(e.target.value);
            }}
          >
            <option value="none">none</option>
            <option value="lowest">Price(lowest)</option>
           
            <option value="highest">Price(highest)</option>
           
            <option value="a-z">Price(a-z)</option>
           
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div> */}
      <NavLink to="/upload-product">
      <Button>Add Product</Button>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;
    option {
      padding: 0.5rem 0;
      cursor: pointer;
      // height: 2rem;
      padding: 10px;
    }
    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      // height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;
