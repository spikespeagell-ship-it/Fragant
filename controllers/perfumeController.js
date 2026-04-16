const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// OBTENER TODOS
exports.getPerfumes = async (req, res) => {
    try {
        const db = getDB();
        const perfumes = await db.collection("perfumes").find().toArray();
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener perfumes" });
    }
};

// CREAR
exports.createPerfume = async (req, res) => {
    try {
        const db = getDB();
        const { nombre, precio, tipo } = req.body;

        // 🔥 VALIDACIONES
        if (!nombre || !precio || !tipo) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }

        if (precio <= 0) {
            return res.status(400).json({
                error: "El precio debe ser mayor a 0"
            });
        }

        const nuevo = { nombre, precio, tipo };

        await db.collection("perfumes").insertOne(nuevo);

        res.status(201).json({ 
            mensaje: "Perfume agregado" ,
            data: nuevo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

//ACTUALIZAR
exports.updatePerfume = async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.id;
        const { nombre, precio, tipo } = req.body;

        // 🔥 Validar ID
        if (!id) {
            return res.status(400).json({ error: "ID requerido" });
        }

        // 🔥 Validar datos 
        if (precio !== undefined && precio <= 0) {
            return res.status(400).json({
                error: "El precio debe ser mayor a 0"
            });
        }

        const resultado = await db.collection("perfumes").updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );

        // 🔥 Si no encontró nada
        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                error: "Perfume no encontrado"
            });
        }

        res.json({
            mensaje: "Perfume actualizado",
            cambios: req.body
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// ELIMINAR
exports.deletePerfume = async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: "ID requerido" });
        }

        const resultado = await db.collection("perfumes").deleteOne({
            _id: new ObjectId(id)
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                error: "Perfume no encontrado"
            });
        }

        res.json({ mensaje: "Perfume eliminado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar" });
    }
};