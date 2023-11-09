import * as Yup from 'yup';

/**
 * Validación de formulario de contacto, usando Yup
 * Se usa en el componente Contacto.jsx
 */
export const contactoValidationSchema = Yup.object({

  // Validación del campo userName
  userName: Yup.string()
    .min(3, 'Debe tener más de 3 caracteres')
    .max(15, 'Debe tener menos de 15 caracteres')
    .required('Campo obligatorio'),

  // Validación del campo userLastName
  userLastName: Yup.string()
    .min(3, 'Debe tener más de 3 caracteres')
    .max(15, 'Debe tener menos de 15 caracteres')
    .required('Campo obligatorio'),

  // Validación del campo userPhone, usando una expresión regular que valida que el número de teléfono sea válido en Argentina
  userPhone: Yup.string().matches(
    /^(?!(?:11|15)\d{8})(?:\d{2})?\d{8}$/,
    'Debe ingresar un número de teléfono válido en Argentina (sin 0 ni 15)'
  ),

  // Validación del campo userEmail
  userEmail: Yup.string()
    .email('Debe ingresar un email válido')
    .required('Campo obligatorio'),

  // Validación del campo userConfirmEmail, usando oneOf para validar que el campo sea igual al campo userEmail
  userConfirmEmail: Yup.string()
    .email('Debe ingresar un email válido')
    .required('Campo obligatorio')
    .oneOf([Yup.ref('userEmail'), null], 'Los emails no coinciden'),

  // Validación del campo userMessage
  userMessage: Yup.string()
    .min(3, 'Debe tener más de 3 caracteres')
    .max(200, 'Debe tener menos de 200 caracteres')
    .required('Campo obligatorio'),
});
