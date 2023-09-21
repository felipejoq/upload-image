const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/index.js');
const port = process.env.PORT || 3000;
const cors = require('cors');
const helmet = require("./config/helmet.js");

require('dotenv').config();

console.log(process.env.API_KEY)

app.use(helmet())

app.use(cors({
    origin: "*",
    methods: "POST"
}));

// Configuración de Express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Rutas
app.use('/api', router); // Prefijo '/api' para todas las rutas

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor on: http://localhost:${port}`);
});
