const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  getUser,
  getAdmin,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const {
  addNote,
  getNotes,
  updateNote,
  deleteNote,
  deleteAllNote,
} = require("../controllers/noteController");
const {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getQuestion,
} = require("../controllers/questionController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const adminRole = require("../middlewares/adminRole");
const {
  getAllResult,
  storeResult,
  dropAllResult,
  dropUserResult,
  userResult,
  getMaxScore,
  getLastScore,
} = require("../controllers/reportController");
const {
  getUserFavorites,
  addFavoriteQuiz,
  removeFavoriteQuiz,
} = require("../controllers/favoriteController");
const router = express.Router();

//user
router.post("/signup", signupDataValidate, signUp);
router
  .route("/login")
  .post(loginDataValidate, logIn)
  .get(authenticateUser, getUser);
router.get("/logout", logOut);
router.put("/updateuser", authenticateUser, updateUser);
router.delete("/deleteuser", authenticateUser, deleteUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

//admin
router.put("/admin", authenticateUser, adminRole, getAdmin);

//notes

router.post("/addnote", authenticateUser, addNote);
router.get("/getnotes", authenticateUser, getNotes);
router.put("/updatenote", authenticateUser, updateNote);
router.delete("/deletenote", authenticateUser, deleteNote);
router.delete("/deleteallnote", authenticateUser, deleteAllNote);

//questions

router
  .route("/questions")
  .get(authenticateUser, getQuestions)
  .post(authenticateUser, insertQuestions)
  .delete(authenticateUser, dropQuestions);

//question per category
router.route("/question/category").get(authenticateUser, getQuestion);

//reports
/*** Reports for User ***/
router
  .route("/user-result")
  .post(authenticateUser, storeResult)
  .get(authenticateUser, userResult)
  .delete(authenticateUser, dropUserResult);

router.get("/maxscore", authenticateUser, getMaxScore);

router.get("/lastscore", authenticateUser, getLastScore);

/*** Reports for Admin ***/
router
  .route("/results")
  .get(authenticateUser, getAllResult)
  .delete(authenticateUser, dropAllResult);

//Favorites
router.get("/favorites", authenticateUser, getUserFavorites);
router.post("/favorites/add", authenticateUser, addFavoriteQuiz);
router.post("/favorites/remove", authenticateUser, removeFavoriteQuiz);

module.exports = router;
