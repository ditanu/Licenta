const express = require("express");
const locatie = require("../models/locatie");
const router = express.Router();
const locatieController = require("../controllers").locatie;
// const AuthGuard = require("../middleware/auth.middleware");

router.post("/", locatieController.addLocatie);
router.get("/", locatieController.getAllLocatii);
router.get("/:id", locatieController.getLocatieById);
router.delete("/:id", locatieController.deleteOneLocatie);
router.put("/:id", locatieController.updateLocatie);

module.exports = router;
