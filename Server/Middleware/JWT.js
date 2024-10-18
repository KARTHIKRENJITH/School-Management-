// authMiddleware.js
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const userVerification = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "No access token provided" });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      req.userId = user.id; // Store user ID in the request object
      req.userEmail = user.email; // Store user email in the request object
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware for refreshing tokens
const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1m',
      });

      // Set new access token in cookies
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 1000, // 1 minute
      });

      req.userId = user.id;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { userVerification, refreshToken };
