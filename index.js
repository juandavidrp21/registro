import express from "express";
import connectDB from "./src/database/database.js";
import vehicleRouter from "./src/router/vehicle.router.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 3002;

//constante de configuración que permite peticiones desde un entorno de desarrollo
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(morgan("dev"));

app.use("/vehicles", vehicleRouter); //única ruta principal creada para vehículos, desde ahí se creó todo el CRUD solicitado

//conección a la base de datos
await connectDB();
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`); 
})

