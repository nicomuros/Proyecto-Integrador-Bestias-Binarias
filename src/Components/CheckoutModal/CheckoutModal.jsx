import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row, Table } from 'react-bootstrap'
import { useCart } from '../../context/CartContext';
import { useFormik } from 'formik';
import { checkoutValidationSchema } from '../../utils/checkoutValidationSchema';
import { sendOrderRequest } from '../../Services/CheckoutService';

const CheckoutModal = ({handleModal}) => {

  // Se obtiene la lista de productos del carrito desde el contexto, el total del carrito y el precio total
  const {cartList, getCartTotalAmount, getProductTotalPrice } = useCart();

  // validated es un estado que guarda infromación sobre si los campos que ingresó el usuario son válidos. Es formik quien se encarga de validarlos.
  const [validated, setValidated] = useState(false);

  // showModal es un estado que guarda información sobre si se debe mostrar el modal o no
  const [showModal, setShowModal] = useState(true); 

  // checkoutData es un estado que configura la estructura del mensaje que se envía a firebase para cargar los productos
  const [checkoutData, setCheckoutData] = useState({ // Estructura del mensaje a firebase para cargar los productos
    customer: {
      name: '',
      phone: '',
      email: '',
    },
    date: '',
    items: cartList.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    total: getCartTotalAmount(),
  });

  // Configuración del formulario con formik:
  // 1. Se importa useFormik de Formik para crear un objeto formik que gestionará el estado y el comportamiento del formulario.
  // 2. El objeto formik se configura con initialValues, que son los valores iniciales de los campos del formulario, validationSchema, que es un esquema de
  //    validación para los campos, y onSubmit, que es una función que se ejecuta cuando se envía el formulario.
  // 3. Cuando el formulario se envía, formik se encarga de validar los valores según el esquema especificado en validationSchema.
  // 4. Si la validación tiene éxito, se llama a la función sendMessage con los valores del formulario para manejar el envío de un mensaje.
  
  const formik = useFormik({ 
    initialValues: { // Datos iniciales del formulario, se actualizan con cada input
      userName: "",
      userLastName: "",
      userPhone: "",
      userEmail: "",
      userConfirmEmail: "",
    },
    validationSchema: checkoutValidationSchema, // Esquema de validación. Usamos YUP
    onSubmit: (values) => {
      //const orderWithDate = { ...checkoutData, date: new Date() };
      setCheckoutData({ 
        ...checkoutData, 
        customer: {
          name: values.userName + " " + values.userLastName,
          phone: values.userPhone,
          email: values.userEmail
        },
        date: new Date(),
      });
      setValidated(true);
    },
  });

  // Funcion para enviar el mensaje a firebase, usando CheckoutService, comprueba en cada cambio de estado si
  // validated es true, y si lo es, envía el mensaje a firebase. Validated solo cambia a true cuando el usuario
  // completa los campos del formulario, realiza el submit y la validación es exitosa.
  useEffect(() => {
    if (validated) {
      sendOrderRequest(checkoutData);
    }
  }, [validated, checkoutData]);

  // Función para manejar el cierre del modal
  const handleClose = () => {
    setShowModal(false);

    // Es necesario que el componente "Cart" sepa si el modal está abierto o cerrado para poder mostrarlo o no.
    // por eso, cuando se cierra el modal, se llama a la función handleModal que se pasa como propiedad desde el componente "Cart"
    // para que el componente "Cart" sepa que el modal está cerrado y no lo muestre.
    handleModal();
  }

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>Confirmar Compra</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Si validated es true, se muestra un mensaje de éxito, y si no, se muestra el formulario para completar los datos del usuario */}
      {validated ? (
        <>
        <p>Producto comprado con éxito</p>-
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        </>
        ) : (
          <Form variant="dark" onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={6}>
              <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3" >
                  <Form.Control 
                    type="text" 
                    placeholder="Nombre" 
                    name="userName" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                    isInvalid={formik.touched.userName && formik.errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.userName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col sm={6}>
                <FloatingLabel controlId="floatingInput" label="Apellido" className="mb-3" >
                  <Form.Control 
                    type="text"
                    placeholder="Apellido" 
                    name="userLastName" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userLastName}
                    isInvalid={formik.touched.userLastName && formik.errors.userLastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.userLastName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel controlId="floatingInput" label="Teléfono" className="mb-3" >
              <Form.Control 
                type="text" 
                placeholder="Teléfono" 
                name="userPhone" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userPhone}
                isInvalid={formik.touched.userPhone && formik.errors.userPhone}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.userPhone}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
              <Form.Control 
                type="text" 
                placeholder="Email" 
                name="userEmail" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userEmail}
                isInvalid={formik.touched.userEmail && formik.errors.userEmail}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.userEmail}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Confirmar Email" className="mb-3" >
              <Form.Control 
                type="text" 
                placeholder="Confirmar Email"
                name="userConfirmEmail" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userConfirmEmail}
                isInvalid={formik.touched.userConfirmEmail && formik.errors.userConfirmEmail}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.userConfirmEmail}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${getProductTotalPrice(item.id)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="text-end fw-bold"
                    style={{ paddingTop: 20 }}
                  >
                    Total:
                  </td>
                  <td style={{ paddingTop: 20 }}>$ {getCartTotalAmount()}</td>
                </tr>
              </tfoot>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" style={{ marginLeft: 10 }}>
                Comprar
              </Button>
            </div>
          </Form>
        )
      }
    </Modal.Body>
  </Modal>
  )
}

export default CheckoutModal