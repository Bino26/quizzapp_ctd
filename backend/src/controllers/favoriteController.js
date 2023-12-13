const userModel = require("../models/userSchema");

//Add quiz as favorite
const addFavoriteQuiz = async (req, res) => {
  const { userId } = req.user;
  const { quizId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add quiz in the favorites array
    user.favorites.push(quizId);

    await user.save();

    res.json({
      success: true,
      message: "Quiz added from favorites successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getUserFavorites = async (req, res) => {
//   const { userId } = req.user;

//   try {
//     const user = await userModel.findOne({ userId });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Récupérez les détails des quizzes favoris en utilisant les références
//     const favoritesDetails = await Quiz.find({ _id: { $in: user.favorites } });

//     res.json(favoritesDetails);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getUserFavorites = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return favorite list to the user.
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFavoriteQuiz = async (req, res) => {
  const { userId } = req.user;
  const { quizId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete quiz from the favorite lists
    user.favorites.pull(quizId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Quiz removed from favorites successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFavoriteQuiz,
  getUserFavorites,
  removeFavoriteQuiz,
};
