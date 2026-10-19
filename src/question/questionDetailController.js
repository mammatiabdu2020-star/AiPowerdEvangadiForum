import { StatusCodes } from "http-status-codes";
import {
  getSingleQuestionService,
  postAnswerService,
  getSimilarQuestionsService,
  assessAnswerAgainstQuestionService,
} from "./questionDetailService.js";

import { generateQuestionDraftCoachService } from "./geminiTextCoach.service.js";

/**
 * Get Single Question
 * GET /api/questions/:questionHash
 */
export const getSingleQuestionController = async (req, res, next) => {
  try {
    const { questionHash } = req.params;

    const question = await getSingleQuestionService({
      questionHash,
      userId: req.user?.id ?? null,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Question fetched successfully.",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Similar Questions
 * GET /api/questions/:questionHash/similar
 */
export const getSimilarQuestionsController = async (req, res, next) => {
  try {
    const { questionHash } = req.params;

    const userId = req.user?.id ?? null;

    const data = await getSimilarQuestionsService({
      questionHash,
      userId,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Similar questions fetched successfully.",
      data,
      meta: {
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * AI Draft Coach
 * POST /api/questions/draft-coach
 */
export const generateQuestionDraftCoachController = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const data = await generateQuestionDraftCoachService({
      title,
      content,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Draft suggestions generated.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Assess Answer Against Question
 * POST /api/questions/:questionHash/answer-fit
 */
export const assessAnswerAgainstQuestionController = async (req, res, next) => {
  try {
    const { questionHash } = req.params;

    const { answerText } = req.body;

    const data = await assessAnswerAgainstQuestionService({
      questionHash,
      answerText,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Answer assessment completed successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
