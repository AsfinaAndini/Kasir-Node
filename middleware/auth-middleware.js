const { ExtractToken } = require("../utils/token-config");

exports.authorization = async (req, res, next) => {
  try {
    let tokenKey =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!tokenKey) {
      return res.status(404).json({
        message: "Token Not Found",
        data: null
      });
    }
    const decodedToken = ExtractToken(tokenKey);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    } else if (decodedToken.message) {
      return res.status(404).json({
        success: false,
        message: decodedToken.message,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};