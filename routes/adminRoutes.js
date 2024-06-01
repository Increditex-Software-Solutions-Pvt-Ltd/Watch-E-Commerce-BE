const adminController = require("../controllers/adminController");
const adminRouter = require("express").Router();

adminRouter.post("/register", adminController.register);
adminRouter.post("/login", adminController.login);
adminRouter.post("/logout", adminController.logout);
adminRouter.get("/:id", adminController.getUserbyId);
adminRouter.put("/:id", adminController.editUserbyId);
adminRouter.delete("/:id", adminController.deleteUserbyId);
adminRouter.get("/allAdmins", adminController.getAllAdmins);

module.exports = adminRouter;
