const Admin = require('../models/index').admin; 
const { PasswordCompare } = require('../utils/password-util');
const { GenerateToken } = require("../utils/token-util");

//mengeksport variabel supaya bisa digunakan di file lain
exports.authentication = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Admin.findOne({ where: { email } });

    if (!data)
      return res.status(404).json({ message: "Admin not found" });

    const isValidPassword = await PasswordCompare(password, data.password);

    if (!isValidPassword)
      return res.status(404).json({ message: "Incorrect Password" });

    const payload = {
      id: data.id,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    const token = GenerateToken(payload);

    return res.status(200).json({
      status: true,
      logged: true,
      message: "Login success",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
