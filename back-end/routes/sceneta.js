const express = require("express");
const sceneta = require("../models/sceneta");
const router = express.Router();
const scenetaController = require("../controllers").sceneta;
// const AuthGuard = require("../middleware/auth.middleware");

router.post("/", scenetaController.addSceneta);
router.get("/", scenetaController.getAllScenete);
router.get("/:id", scenetaController.getScenetaById);
router.delete("/:id", scenetaController.deleteOneSceneta);
router.put("/:id", scenetaController.updateSceneta);

module.exports = router;
