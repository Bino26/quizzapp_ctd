const reportModel = require("../models/reportSchema");

/******************************************************************
 * @storeResult
 * @route /api/v1/user-result
 * @method POST
 * @description storeResult fonction for save report after a quiz
 * @body quizId, attemptsCount, points, questions, achived
 * @returns User Object
 ******************************************************************/

const storeResult = async (req, res) => {
  try {
    const { quizId, attemptsCount, points, questions, achived } = req.body;
    if (!quizId && !attemptsCount && !points && !questions && !achived)
      throw new Error("Data Not Provided...!");
    const r = await reportModel.create({
      userId: req.user.userId,
      quizId,
      attemptsCount,
      points,
      questions,
      achived,
    });
    const resultsave = r.save();
    res.status(200).json({
      success: true,
      message: " Result Saved Successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************************
 * @getResultPerUser
 * @route /api/v1/user-result
 * @method GET
 * @description getResult fonction for get report per user
 * @body
 * @returns User Object
 ******************************************************************/

const userResult = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await reportModel.find({ userId: userId });
    //verify is not array is empty and return a message
    if (result.length === 0) {
      throw new Error("You don't have any report for the moment !");
    }
    res.status(200).json({
      success: true,
      results: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/******************************************************************
 * @dropUserResult
 * @route /api/v1/user-result
 * @method DELETE
 * @description dropUserResult fonction for delete all result  for a user
 * @body
 * @returns User Object
 ******************************************************************/

const dropUserResult = async (req, res) => {
  const { userId } = req.user;
  try {
    await reportModel.deleteMany({ userId: userId });
    res.status(200).json({
      success: true,
      message: " Your reports has been deleted successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/** ONLY FOR ADMIN*/

/***get All results ***/
const getAllResult = async (req, res) => {
  const { role } = req.user;

  try {
    if (role !== "admin") {
      return res.status(403).json({
        message: "Only Admin can get all results",
      });
    }
    await reportModel.find();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/** delete all result  for a user*/
const dropAllResult = async (req, res) => {
  const { role } = req.user;
  try {
    if (role !== "admin") {
      return res.status(403).json({
        message: "Only Admin can delete results",
      });
    }
    await reportModel.deleteMany();
    res.status(200).json({
      success: true,
      message: " All reports has been deleted successfuly",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  storeResult,
  userResult,
  dropUserResult,
  getAllResult,
  storeResult,
  dropAllResult,
};
