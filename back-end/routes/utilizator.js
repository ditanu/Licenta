const express = require("express");
const router = express.Router();
const utilizatorController = require("../controllers").utilizator;

router.post("/register", utilizatorController.register);
router.post("/login", utilizatorController.login);
// router.get("/logout", AuthGuard);
router.post("/bilet", utilizatorController.addBilet);
router.get("/", utilizatorController.getAllUsers);
router.delete("/:id", utilizatorController.deleteOneUser);
router.put("/:id", utilizatorController.updateUser);
router.get("/bilete", utilizatorController.getAllBilete);

module.exports = router;
