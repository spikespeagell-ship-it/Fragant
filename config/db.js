const { MongoClient } = require("mongodb"); 

//URI = direccion de la base de datos en la nube
const uri = "mongodb+srv://spikespeagell_db_user:bellybaseDB10@cluster0.eecgnur.mongodb.net/?appName=Cluster0"; 

//Cliente que se conecta a MongoDB
const client = new MongoClient(uri);

//Variable donde guardamos la DB
let db;

//Funcion para conectar
async function conectarDB() {
    try {
        await client.connect(); //conecta
        db = client.db("fragantDB"); //selecciona du DB
        console.log("Conectado a MongoDB");
    } catch(error) {
        console.log("Error conectando", error);
    }
}

//Funcion para usar la DB en otros archivos
function getDB() {
    return db;
}

//Exportamos funciones
module.exports = { conectarDB, getDB };
