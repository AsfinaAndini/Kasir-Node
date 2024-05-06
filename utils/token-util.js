const jwt = require("jsonwebtoken");
const Secret = "tokenAsliCumaAdminYangTawu*"

exports.GenerateToken = (data) => {
  const token = jwt.sign(data, Secret, { expiresIn: "1d" });
  return token;
};

exports.ExtractToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, Secret);
    return decodedToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { message: "Your token has been expired, please log in again" };
    }
    return null;
  }
};