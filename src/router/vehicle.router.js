import { Router } from "express";
import { deleteVehicle, getOneVehicle, getVehicles, insertVehicles, updateVehicle } from "../controllers/vehiclesController.js";

const vehicleRouter = Router();

//como todas las rutas se configuraron en el mismo controlador, solo se crea la ruta y se hace un llamado a la función
vehicleRouter.post("/insertVehicles", insertVehicles);
vehicleRouter.get("/list-vehicles", getVehicles);
vehicleRouter.get("/list-vehicles/:id", getOneVehicle);
vehicleRouter.put("/updateVehicle/:id", updateVehicle);
vehicleRouter.delete("/deleteVehicle/:id", deleteVehicle)

export default vehicleRouter;