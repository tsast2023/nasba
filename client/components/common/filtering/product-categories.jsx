import React, { useState, useEffect , useContext } from "react";
import axios from "axios";
import useGlobalContext from "../../../hooks/use-context";
import { GlobalState } from "../../../contextM/GlobalState";

const ProductCategories = () => {
  const { handleCategoryChange, categoryActive } = useGlobalContext();
  const [categoryData, setCategoryData] = useState([]);
  const {Categories} = useContext(GlobalState)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-title mb-25">
          <h3>Product Categories</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="categories">
            <div className="categories__list">
              <ul>
                {categoryData.map((category, index) => (
                  <li
                    className={
                      categoryActive === category.title ? "active" : ""
                    }
                    onClick={() => Categories(category.title)}
                    key={index}
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
