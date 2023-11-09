import { getCategoryList } from "../../Services/CategoryService";
import { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";
import CartWidget from "./CartWidget";
import styles from "./Navbar.module.css";
import logo from '../../assets/logo.png';

const CustomNavbar = () => {

  // Se obtiene la lista de categorías desde el servicio de categorías
  const [categories, setCategories] = useState([])

  // areCategoriesCharged es un estado que guarda información sobre si las categorías se cargaron o no
  const [areCategoriesCharged, setAreCategoriesCharged] = useState(false)

  // Se obtiene la lista de categorías desde el servicio de categorías
  useEffect(() => {
    getCategoryList()
      .then((categoryList) => {
        setCategories(categoryList)
        setAreCategoriesCharged(true)})
  }, [])

  const navbarProps = {
    categories,
    areCategoriesCharged,
  }

  return (
    <Navbar className={`${styles.navbar}`} variant="pills" expand="md" style={{ height: "80px" }}>
      <Container>
        <Link to='/' className={`${styles.links}`}>
          <Navbar.Brand><Image src={logo} alt="Mi Imagen" fluid/></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className={`me-auto d-flex align-items-center justify-content-between w-100`}  >
            <div className={`d-flex align-items-center ${styles.buttons}`} 
            >
              {/* Se muestra el componente NavbarDropdown que muestra las categorías de productos */}
              <NavbarDropdown {...navbarProps} />

            </div>
            {/* Se muestra el componente Link que muestra el link a la página de contacto */}
            <div className={`d-flex align-items-center ${styles.buttons}`} >
              <Link to="/contacto" className={`contact-link ${styles.links}`}>
                Contactanos
              </Link>
            </div>

            {/* Se muestra el componente CartWidget que muestra el ícono del carrito y la cantidad de productos que hay en el carrito */}
            <Link to="/cart">
              <CartWidget />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};



export default CustomNavbar;
