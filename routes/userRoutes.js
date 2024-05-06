const userController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/userbyId/:id", userController.getUserbyId);
userRouter.put("/editUser/:id", userController.editUserbyId);
userRouter.put("/deleteUser/:id", userController.deleteUserbyId);
userRouter.get("/allUsers", userController.getAllUsers);

module.exports = userRouter;
