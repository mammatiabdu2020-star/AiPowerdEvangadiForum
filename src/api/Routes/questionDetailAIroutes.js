import express from "express";
import {
  authenticateUser as auth,
  optionalAuth,
} from "../../middleware/authentication.js";

import {
  createQuestionValidation,
  getQuestionsValidation,
  getSingleQuestionValidation,
  searchQuestionsValidation,
  getSimilarQuestionsValidation,
  generateQuestionDraftCoachValidation,
  assessAnswerAgainstQuestionValidation,
} from "../../question/validation.js";

// General question controllers
import {
  createQuestionController,
  getQuestionsController,
  searchQuestionsSemanticController,
  generateQuestionDraftCoachController,
} from "../../question/controller.js";

// Question detail controllers
import {
  getSingleQuestionController,
  getSimilarQuestionsController,
  assessAnswerAgainstQuestionController,
} from "../../question/questionDetailController.js";

const router = express.Router();

router.post(
  "/draft-coach",
  optionalAuth,
  generateQuestionDraftCoachValidation,
  generateQuestionDraftCoachController,
);

// Create Question
router.post("/", auth, createQuestionValidation, createQuestionController);

// Get Questions
router.get("/", optionalAuth, getQuestionsValidation, getQuestionsController);

//  Semantic Search
router.get(
  "/search",
  optionalAuth,
  searchQuestionsValidation,
  searchQuestionsSemanticController,
);

// Get Single Question
router.get(
  "/:questionHash",
  optionalAuth,
  getSingleQuestionValidation,
  getSingleQuestionController,
);

// Get Similar Questions
router.get(
  "/:questionHash/similar",
  optionalAuth,
  getSimilarQuestionsValidation,
  getSimilarQuestionsController,
);

// Assess Answer Fit
router.post(
  "/:questionHash/answer-fit",
  auth,
  assessAnswerAgainstQuestionValidation,
  assessAnswerAgainstQuestionController,
);

export default router;
