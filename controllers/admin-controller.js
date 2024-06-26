const bcrypt = require('bcrypt');
const admin = require('../models/index').admin; 

exports.getAllAdmin = async (_, res) => {
  try {
    const dataAdmin = await admin.findAll();
    res.json({
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

    res.json({
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
    const { email, password, nama } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await admin.create({ email, password: hashedPassword, nama });
    res.json({
      success: true,
      message: "Success create data admin",
      data: newAdmin,
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
    res.json({
      success: true,
      message: "Success update data admin",
      data: existingAdmin,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal Server Error" });
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
    res.json({ message: "Internal Server Error" });
  }
};
