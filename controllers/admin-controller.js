const bcrypt = require('bcrypt');
const { admin } = require('../models/admin'); 

exports.getAllAdmin = async (_, res) => {
  try {
    const dataAdmin = await admin.findAll();
    res.status(200).json({
      success: true,
      message: "Success load data admin",
      data: dataAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findAdmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataAdmin = await admin.findByPk(id);
    if (!dataAdmin)
      return res.status(404).json({ message: "Data admin not found" });

    res.status(200).json({
      success: true,
      message: "Success load data admin",
      data: dataAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await admin.create({ nama, email, password: hashedPassword });
    res.status(200).json({
      success: true,
      message: "Success create data admin",
      data: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingAdmin = await admin.findByPk(id);

    if (!existingAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }

    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await existingAdmin.update({ email, password: hashedPassword, name });
    res.status(200).json({
      success: true,
      message: "Success update data admin",
      data: existingAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteadmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingAdmin = await admin.findByPk(id);
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }
    await existingAdmin.destroy();
    res
      .status(200)
      .json({
        success: true,
        data: existingAdmin,
        message: "Success delete data admin",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
