const express = require("express");
const feedback = require("../models/feedback");
const router = express.Router();
const feedbackController = require("../controllers").feedback;
// const AuthGuard = require("../middleware/auth.middleware");

router.post("/", feedbackController.addFeedback);
router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.delete("/:id", feedbackController.deleteOneFeedback);
router.put("/:id", feedbackController.updateFeedback);

module.exports = router;
