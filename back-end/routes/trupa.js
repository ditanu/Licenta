const express = require("express");
const router = express.Router();
const trupaController = require("../controllers").trupa;
// const AuthGuard = require("../middleware/auth.middleware");

router.post("/", trupaController.addTrupa);
router.get("/", trupaController.getAllTrupe);
router.get("/:id", trupaController.getTrupaById);
router.delete("/:id", trupaController.deleteOneTrupa);
router.put("/:id", trupaController.updateTrupa);
router.put("/activeazaDezactiveaza/:id", trupaController.activeazaTrupa);

// router.get

module.exports = router;
