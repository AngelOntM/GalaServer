/**
 * Importar Dependencias
 */
import express from "express";
import cors from 'cors';
import morgan from "morgan";
//import swaggerUI from "swagger-ui-express";
//import swaggerDocument from "../swagger.json"

/**
 * Importar Rutas
 */
import menu from "./routes/menu.js"
import modulo from "./routes/modulo.js"
import region from "./routes/region.js"
import motivo from "./routes/motivo.js"
import estatus from "./routes/estatus.js"
import rol from "./routes/rol.js"
import sucursal from "./routes/sucursal.js"
import usuario from "./routes/usuario.js"
import rolxusu from "./routes/rolxusu.js"
import rolxest from "./routes/rolxest.js"
import movimiento from "./routes/movimiento.js"
import estxmov from "./routes/estxmov.js"
import comenta from "./routes/comenta.js"
import opcionxrol from "./routes/opcionxrol.js"

const app = express();

/**
 * Dependencies
 */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/**
 * Routes
 */
app.use(menu)
app.use(modulo)
app.use(region)
app.use(motivo)
app.use(estatus)
app.use(rol)
app.use(sucursal)
app.use(usuario)
app.use(rolxusu)
app.use(rolxest)
app.use(movimiento)
app.use(estxmov)
app.use(comenta)
app.use(opcionxrol)

app.get('/', (req, res) => { res.json('welcome') })

export default app;