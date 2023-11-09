import { db } from "../firebaseConfig";
import {collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

/**
 * Filtra la coleccion de productos por categoria,
 * si no se pasa ninguna categoria, devuelve todos los productos
 */
const filterQuery = (category) => {
  const productsCollection = collection(db, "products");

  // Si se pasa una categoria, se filtra por categoria, sino se devuelve toda la coleccion
  if (category) {

    // Se filtra la coleccion de productos por categoria
    return query(productsCollection, where("category", "==", category));
  } else {

    // Se devuelve toda la coleccion de productos
    return query(productsCollection);
  }
}

/**
 *  Obtiene la lista de productos de la base de datos
 * @param {string} category - nombre de la categoria a filtrar
 * @returns devuelve un array de productos
 */
export const getProductListRequest = async (category = null) => {

  // Se crea un array vacio para almacenar los productos
  let productList = [];
  try{

    // Se realiza un filtrado de la coleccion de productos cuando se pasa una categoria
    const productsCollection = filterQuery(category);

    // Se obtiene la lista de productos
    const productsSnapshot = await getDocs(productsCollection);

    // Se itera sobre la lista de productos y se almacenan en el array, agregando el id del producto
    productList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productList;
  }
  catch(error){
    console.log(error);
  }
}

// Obtiene el detalle de un producto por id, devuelve null si no existe o el producto si existe.
export const getProductDetailRequest = async (id) => {
  try {

    // Se configura la colección de firebase que se va a usar
    const itemCollection = collection(db, "products");

    // Se obtiene el producto por id de la colección descrita en itemCollection
    const queryById = doc(itemCollection, id);
    
    // Se obtiene el producto
    const receivedProduct = await getDoc(queryById);

    // Si el producto existe, se devuelve el producto con el id
    if (receivedProduct.exists()) {
      const productDetail = { ...receivedProduct.data(), id: receivedProduct.id };
      return productDetail;
    } else {
      console.log("No existe el producto en firebase  ")
      return null; // Return null if the product doesn't exist
    }
  } catch (error) {
    console.error("Error obteniendo productDetail desde Firebase:", error);
    throw error;
  }
}






