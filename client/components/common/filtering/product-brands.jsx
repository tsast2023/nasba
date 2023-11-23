import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useGlobalContext from '../../../hooks/use-context';

const ProductBrands = () => {
  const { resetFiltering, filteringBrands } = useGlobalContext();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/brand');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <>
      <div className="sidebar__widget mb-50">
        <div className="sidebar__widget-title mb-25">
          <h3>Brand</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="brand">
            <ul>
              {brands.map((brand) => (
                <li key={brand._id} onClick={() => filteringBrands(brand.title)}>
                  <button>{brand.title}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="reset-button mt-20">
          <button onClick={resetFiltering}>Reset Filter</button>
        </div>
      </div>
    </>
  );
};

export default ProductBrands;
