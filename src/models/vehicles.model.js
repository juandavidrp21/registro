import mongoose from "mongoose";

//Esquema del modelo de la base de datos
const VehiclesSchema = new mongoose.Schema({
  vehicle: {
    type: String,
    required: true,
    enum: ["carro", "moto"]
  },

  plate: {
    type: String,
    required: true,
  },

  time: {
    type: Number
  }
});

export const vehiclesModel = mongoose.model("vehicles", VehiclesSchema);
