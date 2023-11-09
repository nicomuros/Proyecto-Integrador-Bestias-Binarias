import { ClipLoader } from "react-spinners";

// Componente para mostrar un spinner de carga
const Loading = () => {
  return (
      <div className={`d-flex align-items-center justify-content-center`} style={{ height: "100vh" }}>
        <ClipLoader color="#000000" />
      </div>
  );
};

export default Loading;