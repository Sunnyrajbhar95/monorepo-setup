import AuthServices from "../../services/authServices/authServices.ts";
import type { User } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../../utils/asyncHandler.ts";
import apiResponse from "../../utils/apiResponse.ts";

class AuthController {
  authServices: AuthServices;
  constructor() {
    this.authServices = new AuthServices();
  }

  // this is the signup function which will be used to create a new user and send otp to the user for verification
  signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: User = req.body;
      const createdUser = await this.authServices.signUP(user);
      res
        .status(201)
        .json(new apiResponse(201, "User created successfully", createdUser));
    },
  );

  // this is the verifyUser function which will be used to verify the user using otp and generate access token and refresh token
  verifyUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, otp } = req.body;
      const userdata = await this.authServices.verifyUser(email, otp);
      res
        .status(200)
        .cookie("refreshToken", userdata?.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("accessToken", userdata?.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json(
          new apiResponse(200, "OTP verified successfully", userdata?.user),
        );
    },
  );

  // this is the login function which will be used to login the user and generate access token and refresh token
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const respose = await this.authServices.login(email, password);
      res
        .status(200)
        .cookie("refreshToken", respose?.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("accessToken", respose?.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json(new apiResponse(200, "Login successfully", []));
    },
  );
  //  this fuction is basically use  change the password of the user and send the new password to the user email
  changePassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user?.id;
      const response = await this.authServices.changePassword(
        userId,
        oldPassword,
        newPassword,
      );
      res
        .status(200)
        .json(new apiResponse(200, "Password changed successfully", response));
    },
  );

  refreshToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { refreshToken } = req.cookies;

      console.log(req.cookies);

      const response = await this.authServices.refreshToken(refreshToken);
      res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .cookie("refreshToken", response?.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("accessToken", response?.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json(new apiResponse(200, "Refresh token generated successfully", []));
    },
  );

  logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.user.id;
      const response = await this.authServices.logout(id);
      res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(new apiResponse(200, "Logout successfully", []));
    },
  );
}

export default AuthController;
