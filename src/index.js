import express from "express";
import dotenv from "dotenv";
import mercadopago from "./routes/mercadopago.routes.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/mercadopago', mercadopago);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});