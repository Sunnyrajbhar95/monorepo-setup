import express from "express";
import AuthController from "../../controllers/authControllers/auth.controller.ts";
import validate from "../../middleware/validate.ts";
import { signupSchema } from "../../validators/auth.validator.ts";
import userAuth from "../../middleware/AuthMiddleware.ts";
const authController = new AuthController();
const authRoutes = express.Router();

authRoutes.post("/signup", validate(signupSchema), authController.signup);
authRoutes.post("/verify-otp", authController.verifyUser);
authRoutes.post("/login", authController.login);
authRoutes.get("/refresh-token", authController.refreshToken);

authRoutes.use(userAuth);
authRoutes.get("/protected", (req, res) => {
  console.log("User ID from token:", req.user?.id); // Access the user ID from the token
  res.status(200).json({ message: "You have accessed a protected route!" });
});

authRoutes.post("/change-password", authController.changePassword);
authRoutes.get("/logout", authController.logout);

export default authRoutes;
