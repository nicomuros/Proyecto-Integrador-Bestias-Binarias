import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Función para ordenar las categorías alfabéticamente por el campo "type"
const sortCategories = (categories) => {
  return categories.sort((a, b) => {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;
    return 0;
  });
}

// Función asincrónica para obtener una lista de categorías
export const getCategoryList = async () => {
  let categoryList = [];

  try {
    // Crear una referencia a la colección "categories" en la base de datos
    const productsCollection = collection(db, "categories");
    
    // Obtener una instantánea de la colección de categorías
    const productsSnapshot = await getDocs(productsCollection);
    
    // Mapear los documentos de categoría a objetos con el ID y los datos
    categoryList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Ordenar la lista de categorías alfabéticamente
    categoryList = sortCategories(categoryList);
  } catch (error) {
    // Capturar y manejar errores en la obtención de categorías
    console.log(error);
  } finally {
    // Devolver la lista de categorías, incluso si está vacía
    return categoryList;
  }
}
