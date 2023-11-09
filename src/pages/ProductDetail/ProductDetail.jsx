import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import LoadingPage from "../../Components/Loading/Loading";
import { useCart } from '../../context/CartContext';
import { Col, Image, Row } from 'react-bootstrap';
import styles from "./ProductDetail.module.css"
import ItemCount from '../../Components/ItemCount/ItemCount';
import { useProduct } from '../../context/ProductContext';
import Swal from 'sweetalert2';

const ProductDetail = () => {
  // Obtención de estados y funciones del contexto del producto.
  const { productDetail, loadingProductDetail, getProductDetail } = useProduct();

  // Obtención del ID del producto de los parámetros de la URL.
  const { productId } = useParams();

  useEffect(() => {
    // Llamada a la función para obtener los detalles del producto.
    getProductDetail(productId);
    // eslint-disable-next-line
  }, [productId]);

  return (
    <>
      {loadingProductDetail ? (
        // Si se está cargando el detalle del producto, se muestra una página de carga.
        <LoadingPage />
      ) : (
        // Si no se está cargando, se muestra el detalle del producto.
        <Row className={styles.row}>
          {productDetail ? (
            // Si hay detalles del producto, se muestra el componente ProductDetailList.
            <ProductDetailList productDetail={productDetail} />
          ) : (
            // Si no se encuentran detalles del producto, se muestra un mensaje de error.
            <h1 style={{
              color: "black",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 50
            }}>No se encontró el producto</h1>
          )}
        </Row>
      )}
    </>
  );
};

export default ProductDetail;

const ProductDetailList = ({ productDetail }) => {
  // Obtención de funciones y datos del contexto del carrito.
  const { addToCart, getProductQuantity } = useCart();

  // Obtención de la cantidad inicial de productos en el carrito.
  const initial = getProductQuantity(productDetail.productId);

  // Obtención del stock disponible del producto.
  const stock = productDetail.stock;

  // Función para agregar productos al carrito.
  const onAdd = (quantity) => {
    const productWithQuantity = {
      ...productDetail,
      quantity,
    };

    // Se muestra una alerta de éxito.
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1000,
    });
    // Llamada a la función para agregar el producto al carrito.
    addToCart(productWithQuantity);
  };

  return (
    <>
      <Col lg={6} className="d-flex align-items-center justify-content-center">
        <Image src={productDetail.img} fluid className={styles.imagen} />
      </Col>
      <Col lg={6} className="d-flex align-items-center flex-column justify-content-center ">
        <h1 className={styles.nombre}>{productDetail.name}</h1>
        <p className={styles.descripcion}>{productDetail.description}</p>
        <p className={styles.precio}>Precio: ${productDetail.price}</p>
        <ItemCount stock={stock} initial={initial} onAdd={onAdd}  className={styles.itemCount}/>
      </Col>
    </>
  );
};
