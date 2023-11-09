import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Definición del componente funcional ScrollToTop
const ScrollToTop = () => {
  // Obtener el pathname actual de la ubicación (ruta)
  const { pathname } = useLocation();

  // Utilizar el efecto para desplazarse al principio de la página cuando cambia la ruta
  useEffect(() => {
    // La función window.scrollTo se utiliza para ajustar la posición de desplazamiento de la ventana del navegador.
    // En este caso, se establece en (0, 0) para ir al principio de la página (coordenadas x=0, y=0).
    window.scrollTo(0, 0);
  }, [pathname]);

  // Devolver null; este componente no renderiza nada en la interfaz de usuario.
  return null;
};

// Exportar el componente ScrollToTop
export default ScrollToTop;
