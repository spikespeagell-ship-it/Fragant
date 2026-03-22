const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
app.use(express.json());

const uri = "mongodb+srv://spikespeagell_db_user:bellybaseDB10@cluster0.eecgnur.mongodb.net/?appName=Cluster0"; 

const client = new MongoClient(uri);

let db;

// 🔥 CONEXIÓN
async function conectarDB() {
    try {
        await client.connect();
        db = client.db("fragantDB");
        console.log("🔥 Conectado a MongoDB");
    } catch (error) {
        console.error(error);
    }
}

conectarDB();

// 🔥 GET (leer)
app.get("/perfumes", async (req, res) => {
    const perfumes = await db.collection("perfumes").find().toArray();
    res.json(perfumes);
});

// 🔥 POST (crear)
app.post("/perfumes", async (req, res) => {
    const nuevoPerfume = req.body;
    await db.collection("perfumes").insertOne(nuevoPerfume);
    res.json({ mensaje: "Perfume agregado" });
});

// 🔥 PUT (editar)
app.put("/perfumes/:id", async (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    await db.collection("perfumes").updateOne(
        { _id: new ObjectId(id) },
        { $set: datos }
    );

    res.json({ mensaje: "Perfume actualizado" });
});

// 🔥 DELETE (eliminar)
app.delete("/perfumes/:id", async (req, res) => {
    const id = req.params.id;

    await db.collection("perfumes").deleteOne({
        _id: new ObjectId(id)
    });

    res.json({ mensaje: "Perfume eliminado" });
});

app.use(express.static(path.join(__dirname, "public")));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});