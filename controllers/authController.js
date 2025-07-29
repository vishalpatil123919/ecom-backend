const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "Please provide both email and password",
      });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      message: "Registration done",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({
      message: "Login done",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt");

  res.json({
    message: "logout successful",
  });
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token)
    return res.status(401).json({
      authenticated: false,
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      authenticated: true,
      user: decoded,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({
      authenticated: false,
    });
  }
};
module.exports = {
  register,
  login,
  logout,
  verifyUser,
};
