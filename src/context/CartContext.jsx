import { createContext, useContext, useState } from "react"

export const CartContext = createContext() //idealmente, el mismo nombre que el archivo

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.log("useProduct debe estar dentro del proveedor ProductProvider")
  }
  return context;
}
const CartProvider = ( {children} ) => { //este es el componente que provee el contexto

  const [cartList, setCartList] = useState([]); //el estado inicial es un array vacío
  
  const addToCart = (productWithQuantity) => { //recibe un producto con cantidad y lo agrega al carrito o actualiza la cantidad si ya está en el carrito
    if (isInCart(productWithQuantity.id)){
      const productIndex =  cartList.findIndex(product => product.id === productWithQuantity.id);
      const updatedCartList = [...cartList]
      updatedCartList[productIndex] = productWithQuantity
      setCartList(updatedCartList)
    } else { //si no está en el carrito, lo agrega
      setCartList([...cartList, productWithQuantity])
    }
  }

  const isInCart = (id) => { //recibe un id y devuelve true si el producto está en el carrito
    const product = cartList.find((producto) => producto.id === id);
    return product !== undefined
  }

  const decreaseProductQuantity = (id) => { //recibe un id y disminuye la cantidad del producto en 1
    const MIN_QUANTITY = 1
    const newCartList = cartList.map((product) =>
      (product.id === id && product.quantity > MIN_QUANTITY)
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCartList(newCartList);
  };

  const increaseProductQuantity = (id) => { //recibe un id y aumenta la cantidad del producto en 1
    const MAX_QUANTITY = 6
    const newCartList = cartList.map((product) =>
      (product.id === id && product.quantity < MAX_QUANTITY)
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCartList(newCartList);
  }

  const deleteProduct = (id) => { //recibe un id y elimina el producto del carrito
    const newCartList = cartList.filter((elemento) => elemento.id !== id)
    setCartList(newCartList)
  }


  const getCartTotalQuantity = () => { //devuelve la cantidad total de productos en el carrito
    const total =  cartList.reduce((acc, curr) => {
      return (acc + curr.quantity)
    },0)
    return total
  }

  const getCartTotalAmount = () => {  //devuelve el monto total de productos en el carrito
    const total =  cartList.reduce((acc, curr) => {
      return (acc + (curr.quantity * curr.price))
    },0)
 
    return total
  }

  const getProductQuantity = (id) => { //recibe un id y devuelve la cantidad de ese producto en el carrito
    let productInitialQuantity = 1
    if (isInCart(id)){
      productInitialQuantity = cartList.find((producto) => producto.id === id).quantity;
    }
    return productInitialQuantity
  }

  const cleanCart = () => { //elimina todos los productos del carrito
    setCartList([])
  }

  const getProductTotalPrice = (id) => { //recibe un id y devuelve el precio total de ese producto en el carrito (cantidad * precio)
    const product = cartList.find((producto) => producto.id === id);
    return product.price * product.quantity
  }

  const isCartWithProducts = () => { //devuelve true si el carrito tiene productos
    return cartList.length > 0
  }

  const cartContextList = {
    cartList,
    setCartList,
    addToCart,
    decreaseProductQuantity,
    increaseProductQuantity,
    deleteProduct,
    getCartTotalAmount,
    cleanCart,
    getCartTotalQuantity,
    getProductQuantity,
    getProductTotalPrice,
    isCartWithProducts,
  }

  //value va a manejar todo lo que quiero proveer al contexto
  return (
    <CartContext.Provider value={ cartContextList }>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider