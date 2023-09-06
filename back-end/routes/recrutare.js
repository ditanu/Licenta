const express = require("express");
const recrutare = require("../models/recrutare");
const router = express.Router();
const recrutareController = require("../controllers").recrutare;
// const AuthGuard = require("../middleware/auth.middleware");

router.post("/", recrutareController.addRecrutare);
router.get("/", recrutareController.getAllRecrutari);
router.get("/:id", recrutareController.getRecrutareById);
router.delete("/:id", recrutareController.deleteOneRecrutare);
router.put("/:id", recrutareController.updateRecrutare);

module.exports = router;
