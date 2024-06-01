import React, { useState } from 'react'
import styled from 'styled-components';
import { useFilterContext } from '../context/FilterContext';
import { FaCheck } from 'react-icons/fa';
import FormatPrice from './FormatPrice';
import { Button } from '../styles/Button';

const FilterSection = () => {
  const {filters : {text, category, color, maxPrice, price, minPrice}, updateFilterValue, all_products, clearFilters } = useFilterContext();

  const getUniqueData = (data, property) =>{
      let newVal = data.map((curElem) => {
        return curElem[property];
      })

      if(property === "colors")
      {
        newVal = [].concat(...newVal)
        // newVal = newVal.flat(); // another way to get all unique colors 
        // it make a single dimension array with unique value
      }

      return newVal = ["all", ...new Set(newVal)]
  }

  const categoryData = getUniqueData(all_products, "category");
  const companyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="text" value={text} onChange={updateFilterValue} placeholder='SEARCH' />
        </form>
      </div>
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {
            categoryData.map((curElem, i) =>{
              return <button key={i} name='category' value={curElem} onClick={updateFilterValue} className={curElem === category? "active" : ""} >{curElem}</button>
            })
          }
        </div>
      </div>
      <div className="filter-company">
        <h3>Company</h3>
        <select name='company' onClick={updateFilterValue} className='filter-company--select'>
          {
            companyData.map((curElem, i) =>{
              return <option key={i} value={curElem}>{curElem}</option>
            })
          }
        </select>
      </div>
      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {
            colorsData.map((curElem, i) =>{
              if(curElem === "all")
              {
                return <button key={i} className='color-all--style' name='color' value={curElem} onClick={updateFilterValue}>all</button>
              }
              else
              {
                return <button key={i} style={{background : curElem}} className={color === curElem? "btnStyle active" : "btnStyle"} name='color' value={curElem} onClick={updateFilterValue}>{color === curElem? <FaCheck className='checkStyle'></FaCheck> : null}</button>
              }
            })
          }
        </div>
      </div>
      <div className="filter_price">
        <h3>Price</h3>
        <p><FormatPrice price={price} ></FormatPrice></p>
        <input type="range" name="price" min={minPrice} max={maxPrice} value={price} step={50} onChange={updateFilterValue} className='hh' />
      </div>

      <div className="filter-clear">
        <Button className='btn' onClick={clearFilters} >Clear Flters</Button>
      </div>
      
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #6254F3;
    color: #fff;
    font-size : 1.5rem;
  }
`;

export default FilterSection
