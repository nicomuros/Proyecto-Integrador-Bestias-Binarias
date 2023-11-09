import ContactoComponent from "./ContactoComponent"; // Importa el componente de Contacto.
import { useFormik } from "formik"; // Importa la función useFormik para gestionar formularios.
import { sendMessage } from "../../Services/MessageService"; // Importa una función para enviar mensajes.
import { contactoValidationSchema } from "../../utils/contactoValidationSchema"; // Importa un esquema de validación.

/**
 * 
 * Formik es una biblioteca de React que simplifica la gestión de formularios. Los comentarios explican cómo se configura y utiliza Formik en este código:
 * 1. Se importa useFormik de Formik para crear un objeto formik que gestionará el estado y el comportamiento del formulario.
 * 2. El objeto formik se configura con initialValues, que son los valores iniciales de los campos del formulario, validationSchema, que es un esquema de 
 *    validación para los campos, y onSubmit, que es una función que se ejecuta cuando se envía el formulario.
 * 3. Cuando el formulario se envía, formik se encarga de validar los valores según el esquema especificado en validationSchema.
 * 4. Si la validación tiene éxito, se llama a la función sendMessage con los valores del formulario para manejar el envío de un mensaje.
 * 5. Finalmente, el componente ContactoComponent se renderiza y recibe el objeto formik como propiedad para mostrar el formulario en la interfaz de usuario.
 */


// Define el componente Contacto.
const Contacto = () => {
  // Utiliza la función useFormik para gestionar el estado y el comportamiento del formulario.
  const formik = useFormik({
    initialValues: {
      userName: "",
      userLastName: "",
      userPhone: "",
      userEmail: "",
      userConfirmEmail: "",
      userMessage: "",
    },
    validationSchema: contactoValidationSchema, // Aplica el esquema de validación para los campos del formulario.
    onSubmit: (values) => {
      // Cuando el formulario se envía, llama a la función sendMessage con los valores del formulario.
      sendMessage(values);
    },
  });

  return (
    <ContactoComponent formik={formik} /> // Renderiza el componente ContactoComponent y pasa el objeto formik como propiedad.
  );
};

// Exporta el componente Contacto.
export default Contacto;
