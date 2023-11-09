import { useCart } from '../../context/CartContext';
import Swal from 'sweetalert2'
import styles from './CartItem.module.css'; 
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Button } from 'react-bootstrap';


const CartItem = ({item}) => {

  // Se obtiene las funciones para eliminar el producto, aumentar y disminuir la cantidad del producto
  const { deleteProduct, decreaseProductQuantity, increaseProductQuantity, } = useCart();
  
  // Funciones para aumentar, eliminar y disminuir la cantidad del producto
  const handleMinus = (id) => {
    return decreaseProductQuantity(id)
  }
  const handlePlus = (id) => {
    return increaseProductQuantity(id)
  }
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar el producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'Se eliminó correctamente el producto del carrito',
        )
        return deleteProduct(id)
      }
    })
  }

  return (
  <div className={`d-flex justify-content-between ${styles.cartItemContainer}`}>
    <div className={`d-flex ${styles.cartItemInfo}`}>
      <div className={styles.productImage}>
        <img src={item.img} alt={item.name} />
      </div>
      <div className={`d-flex flex-column ${styles.productDetails}`}>
        <p className={styles.productName}>{item.name}</p>
        <p className={styles.productPrice}>$ {item.price}</p>
      </div>
    </div>
    <div className={`d-flex flex-column ${styles.itemButtons}`}>
      <div className={`d-flex ${styles.plusMinusButtons}`}>
        
        <Button variant='outline-primary' onClick={() => handleMinus(item.id)}>
          <AiOutlineMinus />
        </Button>

        <span className={styles.num}>{item.quantity}</span>

        <Button variant='outline-primary' onClick={() => handlePlus(item.id)}>
          <AiOutlinePlus />
        </Button>
        
      </div>
      <div>
        <Button variant='outline-primary' onClick={() => handleDeleteProduct(item.id)}>Eliminar</Button>
      </div>
    </div>
  </div>
  );
}

export default CartItem