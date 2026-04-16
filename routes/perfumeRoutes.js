const express = require("express");
const router = express.Router();

//Importamos el controlador
const controller = require("../controllers/perfumeController");

//Definimos rutas
router.get("/",  controller.getPerfumes);
router.post("/", controller.createPerfume);
router.put("/:id", controller.updatePerfume);
router.delete("/:id", controller.deletePerfume);

module.exports = router;