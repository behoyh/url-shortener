const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    // Get access token from request header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    // Check user is authenticated or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded) {
      // Attach decoded token payload to req.user
      req.userId = decoded.id;
      next();
    } else {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const isOptionallyAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded) {
        req.userId = decoded.id;
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  isAuthenticated,
  isOptionallyAuthenticated,
};
