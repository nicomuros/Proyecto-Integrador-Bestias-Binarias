import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const sendMessage = async (message) => {
  try {
    // Obtén la fecha y hora actual como una cadena formateada
    const timestamp = new Date().toLocaleString();

    // Crear un nuevo objeto de mensaje con la fecha y hora formateadas como ID
    const messageWithTimestamp = {
      ...message,
      time: timestamp,
      fullName: `${message.userName} ${message.userLastName}`,
    };

    // Eliminar los campos 'userName' y 'userLastName' si existen
    delete messageWithTimestamp.userName;
    delete messageWithTimestamp.userLastName;
    delete messageWithTimestamp.userConfirmEmail;

    
    // Agregar el documento a la colección "messages" con el ID personalizado
    await addDoc(collection(db, "messages"), messageWithTimestamp);
    console.log("Document written with ID: ", messageWithTimestamp.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
