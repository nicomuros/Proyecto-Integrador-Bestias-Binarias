import React from 'react'
import { useEffect, useState } from "react";
import { getProductList } from "../../Services/ProductsService";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProductListComponent from './ProductListComponent';
import { useParams } from 'react-router-dom';


const ProductList = () => {
  const [productList, setProductList] = useState();
  const [areItemsCharged, setAreItemsCharged] = useState(false)
  const {category} = useParams();
  useEffect(() => {
    getProductList(category)
      .then((productList) => {
        setProductList(productList)
        setAreItemsCharged(true)
      })
  }, [category])


  return (
    <>   
    {      
      (areItemsCharged) 
      ? <div className="products">
         <ProductListComponent productList={productList} />
        </div>
      : <LoadingPage />
    }    
    </>
  )
}

export default ProductList