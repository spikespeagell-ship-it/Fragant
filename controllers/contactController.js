const { getDB } = require("../config/db");

exports.enviarMensaje = async (req, res) => {
    try {
        console.log("Controller contacto ejecutado");
        console.log("Body recibido:", req.body);
        const db = getDB();
        const { nombre, email, mensaje } = req.body;

        // Validación
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }

        const nuevoMensaje = {
            nombre,
            email,
            mensaje,
            fecha: new Date()
        };

        await db.collection("mensajes").insertOne(nuevoMensaje);

        res.status(201).json({
            mensaje: "Mensaje guardado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al guardar mensaje"
        });
    }
};