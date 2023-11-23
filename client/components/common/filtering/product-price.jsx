import React, { useContext, useState } from 'react';
import Slider from 'react-rangeslider';
import useGlobalContext from '../../../hooks/use-context';
import { GlobalState } from '../../../contextM/GlobalState';

const ProductPrice = () => {
  const [sprice ,  setSprice] = useState(0);
  const {maxPrice} = useContext(GlobalState)
  const state = useContext(GlobalState);
  const price = state.price
  return (
    <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-title mb-30">
          <h3>Filter By Price</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="price__slider">
          <form onSubmit={e => {e.preventDefault();maxPrice(sprice)}}>
            <div id="slider-range">
              <Slider
                value={sprice}
                max={500}
                min={0}
                orientation="horizontal"
                onChange={(value) => setSprice(value)}
              />
            </div>
            <div>
             
                <button type="submit">Filter</button>
                <label htmlFor="amount">Price :</label>
                <input type="text" id="amount" value={`${sprice} TND`} readOnly />
              
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPrice;