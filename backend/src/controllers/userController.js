const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/******************************************************
 * @SIGNUP
 * @route /api/v1/signup
 * @method POST
 * @description singUp function for creating new user
 * @body firstname,lastname,username,email, password
 * @returns User Object
 ******************************************************/

const signUp = async (req, res) => {
  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    //verify is user is already exists
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/******************************************************
 * @LOGIN
 * @route /api/v1/login
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!email || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //create token

    const token = user.jwtToken();
    user.password = undefined;
    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookiesOptions);

    return res.status(200).json({
      success: true,
      message: "User Successfuly Sign",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @GETUSER
 * @route /api/v1/login
 * @method GET
 * @description retrieve user data from mongoDb if user is valid(jwt auth)
 * @returns User Object
 ******************************************************/

const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      message: "User data got  sucessfully",
      data: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/******************************************************
 * @GETADMIN
 * @route /api/v1/admin
 * @method GET
 * @description retrieve user data from mongoDb if user is valid(jwt auth)
 * @returns User Object
 ******************************************************/

const getAdmin = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await userModel.findById(userId);
    //update cookies
    const token = user.jwtToken();
    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "You are now an admin",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @LOGOUT
 * @route /api/v1/logout
 * @method GET
 * @description Remove the token form  cookie
 * @returns logout message and cookie without token
 ******************************************************/

const logOut = (req, res) => {
  try {
    const cookiesOptions = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @UPDATEUSER
 * @route /api/v1/updateuser
 * @method PUT
 * @description Update function for update user data
 * @body name, email,currentPassword,newPassword
 * @returns User Object
 ******************************************************/

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user; //retrieve user.id from jwtverify()
    const {
      firstname,
      lastname,
      email,
      newPassword,
      currentPassword,
      avatarURL,
    } = req.body;
    let c;

    // compare current password
    if (newPassword && currentPassword) {
      const user = await userModel.findById(userId);
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({
          success: "false",
          message: "Your current password is not correct! Try it again ",
        });
      }

      //change password
      c = await bcrypt.hash(newPassword, 10); //hash the new password
    }

    const t = await userModel.findByIdAndUpdate(
      userId,

      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: c,
        avatarURL: avatarURL,
      },
      { new: true }
    );
    t.save();
    //update cookies
    const token = t.jwtToken();
    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "User data updated successfuly",
      data: t,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message, //"User not found "
    });
  }
};

/******************************************************
 * @DELETEUSER
 * @route /api/v1/deleteuser
 * @method DELETE
 * @description delete function for delete user
 
 
 ******************************************************/

const deleteUser = async (req, res) => {
  const { userId } = req.user; //retrieve user.id from jwtverify()
  try {
    await userModel.findByIdAndDelete(userId);
    const cookiesOptions = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "User deleted successfuly",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User was already deleted successfuly  ",
    });
  }
};
/******************************************************
 * @FORGOTPASSWORD
 * @route /api/v1/forgotpassword
 * @method POST
 * @description get the forgot password token
 * @body email
 * @returns forgotPassword token
 ******************************************************/

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // return response with error message If email is undefined
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // retrieve user using given email.
    const user = await userModel.findOne({
      email,
    });

    // return response with error message user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found 🙅",
      });
    }

    // Generate the token with userSchema method getForgotPasswordToken().
    const forgotPasswordToken = user.getForgotPasswordToken();

    await user.save();
    const token = user.jwtToken();
    user.password = undefined;
    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookiesOptions);

    return res.status(200).json({
      success: true,
      token: forgotPasswordToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @RESETPASSWORD
 * @route /api/v1/resetpassword/:token
 * @method POST
 * @description update password
 * @returns User Object
 ******************************************************/

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  // return error message if password or confirmPassword is missing
  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirmPassword is required",
    });
  }

  // return error message if password and confirmPassword  are not same
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm Password does not match ❌",
    });
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await userModel.findOne({
      forgotPasswordToken: hashToken,
      forgotPasswordExpiryDate: {
        $gt: new Date(), // forgotPasswordExpiryDate() less the current date
      },
    });

    // return the message if user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token or token is expired",
      });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "successfully reset the password",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  getUser,
  getAdmin,
  logOut,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};
