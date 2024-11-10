import { countHelper } from "../helpers/countHelper.js";
import { vehiclesModel } from "../models/vehicles.model.js";

//Función para agregar vehículos a la base de datos
export async function insertVehicles(req, res) {
  try {
    const body = req.body;

    //Creo una validación por si no ingresan alguno de las dos propiedades del modelo de Schema, haciéndolos así, obligatorios
    if (!body.plate)
      return res.status(422).json({ message: "Ingresa la placa" });
    if (!body.vehicle)
      return res.status(422).json({ message: "Ingresa el tipo de vehículo" });
    if (!body.time)
      return res.status(402).json({message: 'ingresa el tiempo en minutos, ejemplo: "15"'});

    //dos connstantes que reciben la búsqueda de carros y motos totales del helper creado, las recibe en el orden en que se buscaron en el helper
    const [vehiclesCars, vehiclesMotorcyle] = await countHelper();

    //validación de cupos con las variables anteriores
    if (
      (body.vehicle === "carro" && vehiclesCars >= 5) ||
      (body.vehicle === "moto" && vehiclesMotorcyle >= 10)
    ) {
      return res
        .status(422)
        .json({ message: `No hay más cupos para ${body.vehicle}` });
    }

    //valido que el tipo de vehículo sea carro o moto, de lo contrario, no le permita crearlo
    if (body.vehicle !== "carro" && body.vehicle !== "moto") {
      return res
        .status(422)
        .json({ message: 'Los vehículos permitidos son "moto" o "carro"' });
    }

    //Aquí guardo el vehículo en la base de datos
    const vehicle = new vehiclesModel(body);
    await vehicle.save();

    //Respuesta de éxito
    res
      .status(201)
      .json({ message: "Vehículo guardado correctamente!", vehicle });
  } catch (error) {
    //manejo de errores
    res
      .status(500)
      .json({ message: "Error guardando el vehículo", error: error.message });
  }
}

//Función para traer todos los vehículos guardados en la base de datos
export async function getVehicles(req, res) {
  try {

    //ejecuto nuevamente el helper para almacenar la consuta en estas variables y luego mostrar el total de vehículos para cada tipo
    const [vehiclesCars, vehiclesMotorcyle] = await countHelper();
    const allVehicle = await vehiclesModel.find({});
    res.status(200).json({
      message: `Total carros: ${vehiclesCars} Total motos: ${vehiclesMotorcyle}`,
      allVehicle,
    });
  } catch (error) {

    //manejo de errores
    res.status(500).json({ message: error.message });
  }
}

//Función para buscar por id un solo registro de la base de datos
export async function getOneVehicle(req, res) {
  try {
    const { id } = req.params;
    const vehicle = await vehiclesModel.findById(id);

    //si no lo encuentra
    if(!vehicle){
      return res.status(404).json({message: "Id no encontrado"})
    }

    //se muestra el json del vehículo en la respuesta
    res.status(200).json(vehicle);
  } catch (error) {

    //manejo de errores
    res.status(500).json({ message: error.message });
  }
}

//Función para actualizar vehículo, buscado por id
export async function updateVehicle(req, res) {
  try {

    const {id} = req.params;
    const body = req.body;

    //validación que no permite que se actualice el tipo de vehículo a uno diferente de carro o moto
    if (body.vehicle && body.vehicle !== "carro" && body.vehicle !== "moto") {
      return res
        .status(422)
        .json({ message: 'Los vehículos permitidos son "moto" o "carro"' });
    }

    //constante que guarda la busqueda
    const dataVehicle = await vehiclesModel.findByIdAndUpdate(id, body);

    //si no lo encuentra
    if (!dataVehicle){
      return res.status(404).json({message: "Id no encontrado"})
    }

    //busco nuevamente el registro con el di, y lo muestro
    const update = await vehiclesModel.findById(id);
    res.status(200).json(update);

  } catch (error) {

    //manejo de errores
    res.status(500).json({message: error.message});
  }
}

//Función para eliminar un registro, por id
export async function deleteVehicle(req, res) {
  try {
    const {id} = req.params;

    //se borra y se guarda en una constante la búsqueda
    const dataVehicle = await vehiclesModel.findByIdAndDelete(id);

    //si no existe
    if(!dataVehicle){
      return res.status(404).json({message: "Id no encontrado"})
    }

    //respuesta de éxtito
    res.status(200).json({message: "Vehículo borrado correctamente!"})

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}