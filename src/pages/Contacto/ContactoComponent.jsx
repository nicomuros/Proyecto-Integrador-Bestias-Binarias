import React from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import styles from "./Contacto.module.css";

// Componente ContactoComponent que recibe formik como propiedad.
const ContactoComponent = ({ formik }) => {
  return (
    <Container fluid className={styles.container}>
      <Row className="d-flex justify-content-center">
        <Col lg={5} md={6}>
          {/* Formulario de contacto */}
          <Form variant="dark" onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={6}>
                {/* Campo de Nombre */}
                <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3">
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
                {/* Campo de Apellido */}
                <FloatingLabel controlId="floatingInput" label="Apellido" className="mb-3">
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
            {/* Campo de Teléfono */}
            <FloatingLabel controlId="floatingInput" label="Teléfono" className="mb-3">
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
            {/* Campo de Email */}
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
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
            {/* Campo de Confirmación de Email */}
            <FloatingLabel controlId="floatingInput" label="Confirmar Email" className="mb-3">
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
            {/* Campo de Mensaje (área de texto) */}
            <FloatingLabel controlId="floatingInput" label="Mensaje" className="mb-3">
              <Form.Control 
                as="textarea" 
                placeholder="Mensaje"
                name="userMessage" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userMessage}
                isInvalid={formik.touched.userMessage && formik.errors.userMessage}
                style={{ height: '100px' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.userMessage}
              </Form.Control.Feedback>
            </FloatingLabel>
            {/* Botón de Enviar */}
            <Button type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactoComponent;
