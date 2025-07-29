const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Invalid token. login again",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token. login again",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }
};

module.exports = {
  isAuth,
  isAdmin,
};
