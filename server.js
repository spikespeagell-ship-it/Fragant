const express = require("express");
const path = require("path");
const { conectarDB } = require("./config/db");

const app = express();

//Permite recibir JSON
app.use(express.json());

//Servir frontend
app.use(express.static(path.join(__dirname, "public")));

//Rutas 
app.use("/perfumes", require("./routes/perfumeRoutes"));
app.use("/contacto", require("./routes/contactRoutes"));

//Conectar Db
conectarDB();

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto 3000");
});
