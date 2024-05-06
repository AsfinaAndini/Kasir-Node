const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin'); 
const { GenerateToken } = require("../utils/token-config");

exports.authentication = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      return res.status(404).json({ message: "Incorrect Password" });

    const data = {
      id: admin.id,
      email: admin.email,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    const token = GenerateToken(data);

    return res.status(200).json({
      status: true,
      logged: true,
      message: "Login success",
      data: { ...data, token: token },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
