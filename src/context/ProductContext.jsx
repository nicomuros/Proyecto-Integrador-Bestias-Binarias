import { createContext, useContext, useState } from "react";
import { getProductListRequest, getProductDetailRequest } from "../Services/ProductsService.js";

/**
 * Un contexto es una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.
 * En este caso, se crea un contexto para pasar la lista de productos y el detalle de un producto.
 */

// Se crea el contexto
export const ProductContext = createContext();

// Se crea el hook para usar el contexto
export const useProduct = () => {

  // Se obtiene el contexto
  const context = useContext(ProductContext);

  // Si no se encuentra el contexto, se muestra un error en consola
  if (!context) {
    console.log("useProduct debe estar dentro del proveedor ProductProvider");
  }

  // Se devuelve el contexto. De esta forma, no hace falta usar el 'useContext(ProductContext)' en cada componente,
  // sino que se puede usar el 'useProduct()' directamente, y accedemos a todos los métodos y estados del contexto.
  return context;
}

// Se crea el proveedor del contexto, acá se definen los estados y las funciones.
export const ProductProvider = ({ children }) => {
  
  // Se crean los estados para la lista de productos y para cada detalle de producto
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState(null); // Cambiado a null

  // Se crean los estados para saber si se está haciendo una request a la API de Firebase
  const [loadingProductDetail, setLoadingProductDetail] = useState(true);
  const [loadingProductList, setLoadingProductList] = useState(true);

  /**
   * getProductList() hace una request a la API de Firebase para obtener la lista de productos.
   * Si se pasa una categoría como parámetro, se filtra la lista de productos por esa categoría.
   * Si no se pasa una categoría, se obtiene la lista completa de productos.
   * La solicitud se realiza con la función getProductListRequest() del archivo ProductsService.js
   * @param {string} category - La categoría por la que se quiere filtrar la lista de productos
   * @returns {array} - Devuelve la lista de productos
   */
  const getProductList = async (category = null) => {

    // Se muestra el componente Loading mientras se hace la request
    setLoadingProductList(true);
    try {
      const res = await getProductListRequest(category); // Se hace la request a la API de Firebase
      setProductList(res); // Se guarda la respuesta en el estado productList
      setLoadingProductList(false); // Se cambia el estado loadingProductList a false
      return res; // Devuelve res después de completar la solicitud
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  /**
   * getProductDetail() hace una request a la API de Firebase para obtener el detalle de un producto.
   * La solicitud se realiza con la función getProductDetailRequest() del archivo ProductsService.js
   * @param {string} id - El id del producto que se quiere obtener
   * @returns {object} - Devuelve el detalle del producto
   * 
  */
  const getProductDetail = async (id) => {
    setLoadingProductDetail(true);
    try {
      const res = await getProductDetailRequest(id);
      setProductDetail(res);
      setLoadingProductDetail(false);
      return res; // Devuelve res después de completar la solicitud
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const productContextList = {
    productList,
    loadingProductList,
    getProductList,
    loadingProductDetail,
    getProductDetail,
    productDetail, // Agregado para devolver el detalle del producto
  }

  return (
    <ProductContext.Provider value={productContextList}>
      {children}
    </ProductContext.Provider>
  )
}
