# Ecommerce con React, Firebase, Context API y Hooks

Este proyecto fue realizado como proyecto final para la Tecnicatura Universitaria en Programación de la UTN FRSR. El mismo consiste en un ecommerce de una hamburguesería, 
donde se pueden ver los productos, agregarlos al carrito y realizar la compra.

Para la persistencia de datos (Productos, Categorias, Mensajes del cliente y Ordenes de compra) se utilizó **Firestore** de Firebase, ya que es una base de datos en tiempo real,
y está disponible dentro de la capa gratuita de Google Cloud Platform. Si desea ejecutar el proyecto, es necesario que cree un proyecto en Firebase y configure las variables de entorno
en el archivo .env o en el Dockerfile.

Para el manejo de estado se utilizó **Context API** y **Hooks**. Se crearon contextos para el manejo de los productos, categorías, mensajes y ordenes de compra. En cada uno de ellos se crearon
los métodos necesarios para realizar las operaciones de CRUD. Para el manejo de los estados de los componentes se utilizaron Hooks como useState, useEffect, useContext, etc. Y, además, se crearon
hooks personalizados para el manejo de los estados del carrito y de los productos recibidos desde **firestore**.

Se eligió trabajar con Javascript y React debido a que es una de las tecnologías más utilizadas en el mercado laboral actualmente. Además, se eligió trabajar con **Bootstrap** para el diseño de la aplicación ya que permite un despliegue rápido y sencillo de los componentes.

El proyecto cuenta con un archivo **Dockerfile** para la creación de la imagen y el contenedor de Docker. Para ejecutar el proyecto con Docker, debe configurar las variables de entorno en el archivo Dockerfile.


## Tabla de contenidos
- [Demo](#demo)
- [Instalación con Dockerfile](#instalación-con-dockerfile)
- [Instalación sin Dockerfile](#instalación-sin-dockerfile)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Autores](#autores)


## Demo
<!-- Gif del proyecto -->
## Instalación con Dockerfile
### Clonar el repositorio
```bash
git clone
```

### Configurar dockerfile
Debe inscribir las variables de entorno de Firestore en el archivo Dockerfile:
```bash
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```


### Crear la imagen
```bash
docker build -t ecommerce-react .
```

### Correr el contenedor
```bash
docker run -p 3000:3000 ecommerce-react
```

## Instalación sin Dockerfile

### Clonar el repositorio
```bash
git clone
```

### Instalar dependencias
```bash
npm install
```

### Configurar variables de entorno
Debe inscribir las variables de entorno de Firestore en el archivo .env:
```bash
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

### Iniciar el proyecto
```bash
npm start
```

## Tecnologías utilizadas
- React
- Firebase
- Context API
- Hooks
- Bootstrap
- React Router
- React Icons
- SweetAlert2
- React Spinners
- Formik
- Yup


## Autores
- Nicolás Muros. [Github](https://github.com/nicomuros) [LinkedIn](https://www.linkedin.com/in/npmuros/)
-
-
-
-
-
-
- Fernando Silva. [Github](https://github.com/FernandoSilva12)
- Florencia Ortega. [Github](https://github.com/FlorenciaOrtega82)
