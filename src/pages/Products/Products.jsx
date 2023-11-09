import React, { useEffect } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Container, Row } from 'react-bootstrap';
import styles from './Products.module.css';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useProduct } from '../../context/ProductContext';
import { useParams } from 'react-router-dom';
import BrandComponent from '../../Components/BrandContainer/BrandComponent';

/**
 * Este componente muestra la lista de productos, ya sea en general o filtrados por categoría.
 * Para obtener la lista de productos, accede al hook useProduct() y llama a la función getProductList().
 */


const Products = () => {
  const {loadingProductList, getProductList, productList} = useProduct(); // Se utilizaran las funciones y estados de ProductContext

  const { category } = useParams();

  useEffect(() => {
    category ? getProductList(category) : getProductList();
    // eslint-disable-next-line 
  }, [category])

  /**
   * Si loadingProductList es true, se muestra el componente Loading, de lo contrario se muestra la lista de productos.
   * loadingProductList es true cuando se está haciendo la request a la API de Firebase, y se vuelve false cuando se obtiene la respuesta.
   * cuando es false, se recorre el array de productos y se muestra un componente ProductCard por cada producto, pasando la información como parametro
   */
  return (
    <>
    <BrandComponent/>
      {loadingProductList ? (
        <Loading />
      ) : (
        <Container>
          <Row className={styles.row}>
            <h1 className={styles.titulo}>Lista de productos</h1>
            {productList.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Products;
