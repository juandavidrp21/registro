import mongoose from "mongoose";
import * as dotenv from "dotenv";


dotenv.config();

//se crea constante que guarda función para luego exportarla
const connectDB = async () => {
  try {

    //se debe llamar el archivo .env que también será enviado en respuesta a la pruenba
    await mongoose.connect(
      `mongodb+srv://${process.env.user}:${process.env.password}@backenddb.9epsi.mongodb.net/Node-API?${process.env.database}`
    );

    //mensaje de respuesta
    console.log("Connected to database");
  } catch (error) {

    //manejo de errores
    console.error(error.message);    
    return error.stack;
  }
};

export default connectDB;
