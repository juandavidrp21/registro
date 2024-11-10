import { vehiclesModel } from "../models/vehicles.model.js";

//Función que busca en la base de datos la cantidad de registros por el campo "vehicle" que sean iguales a "carro" o "moto" y los guarda en un array en su orden de búsqueda
//a donde sean llamados, se debe crear una constante con un array y dos variables que recibiran el resultado en el orden en que se están llamando en esta función
export async function countHelper() {
    try {
        const results = await Promise.all([
            vehiclesModel.find({ vehicle: "carro" }).countDocuments(),
            vehiclesModel.find({ vehicle: "moto" }).countDocuments(),
          ]);
          return [...results]
    } catch (error) {
        return []
    }
}
