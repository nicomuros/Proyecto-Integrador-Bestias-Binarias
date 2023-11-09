import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/globals.css';
import Products from './pages/Products/Products';
import NotFound from './pages/NotFound/PageNotFound';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Navbar from './Components/Navbar/Navbar';
import CartProvider from './context/CartContext';
import Footer from './Components/Footer/Footer';
import Contacto from './pages/Contacto/Contacto';
import CartContainer from './pages/Cart/Cart';
import { ProductProvider } from './context/ProductContext';

/**
 * Este es el componente principal de la aplicación.
 * Aquí se importan los componentes que hacen a las rutas de la aplicación (que luego se van a ver reflejados en las URL)
 * Ademas, se importan los contextos que van a ser utilizados en la aplicación.
 */
function App() {
  return (
    <CartProvider> 
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/product/:productId' element={<ProductDetail />} /> {/* :productId es un parametro que se pasa por URL */}
            <Route path='/category/:category' element={<Products />} /> {/* :category es un parametro que se pasa por URL */}
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/cart' element={<CartContainer />} />
            <Route path='*' element={<NotFound />} /> {/* * es un comodin que se utiliza para cuando no se encuentra la ruta */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
