import { BsCart4 } from 'react-icons/bs'
import { useCart } from '../../context/CartContext';
import styles from './CartWidget.module.css'; // Importar archivo CSS

const CartWidget = () => {

  // Se obtiene la cantidad total de productos que hay en el carrito
  const {getCartTotalQuantity} = useCart();
  const totalProducts = getCartTotalQuantity();

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cartIcon}>
        <BsCart4 />
      </div>
      {totalProducts > 0 && ( // Mostrar el contador solo si hay productos en el carrito
        <div className={styles.productCount}>
          {totalProducts}
        </div>
      )}
    </div>
  );
};

export default CartWidget;

