const express = require("express");
const route = express.Router();

const { authorization } = require("../middleware/auth-middleware");

const authController = require("../controllers/auth-controller");
route.post("/auth", authController.authentication);

const adminController = require("../controllers/admin-controller");
route.get("/get/getAll", authorization, adminController.getAllAdmin);
route.get("/:id", authorization, adminController.findAdmin);
route.post("/", adminController.addAdmin);
route.put("/:id", authorization, adminController.updateAdmin);
route.delete("/:id", authorization, adminController.deleteadmin);

module.exports = route;