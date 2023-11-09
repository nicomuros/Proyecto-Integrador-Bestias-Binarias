import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './Cart.module.css';
import CartItem from '../../Components/CartItem/CartItem';
import CheckoutModal from '../../Components/CheckoutModal/CheckoutModal';
import Swal from 'sweetalert2';

export default function Cart() {
  const { isCartWithProducts } = useCart();

  return (
    <Container fluid className={styles.container}>
      <Row className={`d-flex justify-content-center`}>
        {isCartWithProducts() ? (
          <CartModule />
        ) : (
          <NoProducts />
        )}
      </Row>
    </Container>
  );
};

// Componente para mostrar un mensaje cuando el carrito está vacío
const NoProducts = () => {
  return (
    <Col className={`d-flex justify-content-center`}>
      <h2 className={styles.title}>No hay productos en el carrito</h2>
    </Col>
  )
}

// Componente para mostrar el contenido del carrito
const CartModule = () => {

  // Se obtiene la lista de productos del carrito desde el contexto
  const { cartList } = useCart();

  return (
    <>
      <Col lg={6}>
        <h2>Carrito</h2>
        {/* Se recorre la lista del carrito, y se pasan los datos del producto en particular al componente CartItem */}
        {/* Esto es la parte de la izquierda de la página */}
        {cartList.map((item) => {
          return (<CartItem item={item} key={item.id}/>);
        })}
      </Col>
      <Col lg={4}>
        {/* Componente lateral derecho, que muestra el resumen total del carrito y las opciones de finaliza compra*/}
        <CartSummary />
      </Col>
    </>
  )
}

// Componente para mostrar el resumen del carrito y acciones
const CartSummary = () => {

  // Se obtienen las funciones del contexto
  const { getCartTotalAmount, getCartTotalQuantity, cleanCart } = useCart();

  // Estado para manejar la apertura del modal desde el componente "CartSummary", y pasarlo al componente "CheckoutModal"
  // Esto es necesario porque el componente "CheckoutModal" está fuera del componente "Cart", y si bien el modal maneja su propia lógica de apertura y cierre,
  // es necesario que el componente "Cart" sepa si el modal está abierto o cerrado para poder mostrarlo o no.
  const [openModal, setOpenModal] = useState(false);

  // Función para manejar la apertura del modal
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  // Función para manejar el borrado del carrito
  const handleCleanCart = () => {

    // Se muestra un mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro que deseas limpiar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',

      // Si se confirma la acción, se muestra un mensaje de éxito y se limpia el carrito
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado', 'Se limpió correctamente todo el carrito');
        return cleanCart();
      }
    })
  }

  return (
    <div className={styles.ticketContainer}>
      <h3>Productos: {getCartTotalQuantity()}</h3>
      <h3>Subtotal: ${getCartTotalAmount()}</h3>

      <div
        className={`d-flex flex-column justify-content-center`}
        style={{ gap: '10px' }}
      >
        <Button variant='outline-primary' onClick={() => handleModal()}>
          Finalizar compra
        </Button>
        <Button variant='outline-primary' onClick={() => handleCleanCart()}>
          Borrar carrito
        </Button>
      </div>
      {/* Se muestra el modal si el estado de openModal es true */}
      {openModal && <CheckoutModal handleModal={handleModal}/>}
    </div>
  );
}
