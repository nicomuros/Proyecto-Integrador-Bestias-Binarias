import React from 'react';

// Definición del componente PageNotFound
const PageNotFound = () => {
  return (
    <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 style={{
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 50,
      }}> Error 404: Not found </h1>
    </div>
  );
};

// Exportar el componente PageNotFound
export default PageNotFound;
