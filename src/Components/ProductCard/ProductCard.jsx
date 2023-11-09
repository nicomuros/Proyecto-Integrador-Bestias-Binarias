import React from 'react';
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';


/**
 * Este componente se usa en ItemList.jsx para mostrar cada producto de la lista.
 * Recibe como props un objeto producto.
 */

const ProductCard = ({ product }) => {
  console.log(product.img);
  return (
    <Col xs={12} sm={6} md={4} lg={3} className={`d-flex align-center ${styles.col}`}>
      <Link to={`/product/${product.id}`} className={styles.link}>
        <Card className={styles.card}>
          <Card.Img 
            //src='https://res.cloudinary.com/dna9rrdkj/image/upload/v1677524989/Rock%20n%27%20burger/products/carne/Classic-Chicken-burger_wl4pwv.jpg' 
            className={styles.imagen}
            src={product.img}
          />
          <Card.Body className={styles.cardBody}>
            <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
            <Card.Text className={styles.cardText}> {product.description}</Card.Text>
            <Card.Text className={styles.cardText}>$ {product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ProductCard;
