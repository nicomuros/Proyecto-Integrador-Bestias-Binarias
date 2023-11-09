import React from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Navbar.module.css';

const NavbarDropdown = ({ categories, areCategoriesCharged }) => {

  // Se muestra un dropdown con las categorías de productos
  // Si las categorías no se cargaron, se muestra un mensaje de carga
  // Si las categorías se cargaron, se muestra un dropdown con las categorías
  return (
    <NavDropdown
      id='nav-dropdown'
      title='Menú'
    >
      {areCategoriesCharged ? (
        categories.map((category) => (
          <NavDropdown.Item
            as={Link}
            key={category.id}
            style={{ textTransform: 'capitalize' }}
            to={`category/${category.type}`}
            className={styles.dropdownItem}
          >
            {category.type}
          </NavDropdown.Item>
        ))
      ) : (
        <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
      )}
    </NavDropdown>
  );
};

export default NavbarDropdown;
