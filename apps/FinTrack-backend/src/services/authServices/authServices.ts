import UserAuthRepository from "../../repositories/auth.ts";
import type { User } from "@prisma/client";
import apiError from "../../utils/apiError.ts";
import OtpGenerator from "../../utils/generateOtp.ts";
import hashPassword from "../../utils/hashPassword.ts";
import {
  generateToken,
  generateRefreshToken,
} from "../../utils/generateToken.ts";
import jwt from "jsonwebtoken";

class AuthServices {
  userAuthRepository: UserAuthRepository;
  constructor() {
    this.userAuthRepository = new UserAuthRepository();
  }

  // this is the signUP function which will be used to create a new user and send otp to the user for verification
  async signUP(user: User): Promise<User> {
    const { email } = user;
    const existingUser = await this.userAuthRepository.findUserByEmail(email);
    if (existingUser && existingUser?.isVerified === true) {
      throw new apiError(
        409,
        "User with this email already exists and is verified",
      );
    }
    const hashedPassword = await hashPassword.hashPassword(user.password);
    const otp = OtpGenerator.generateOtp();
    const otpExpireTime = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    const userdata = {
      ...user,
      password: hashedPassword,
      otp: otp,
      otpExpireTime: otpExpireTime,
      isVerified: false,
    };
    if (existingUser && existingUser.isVerified === false) {
      const updatedUser = await this.userAuthRepository.updateUser(
        existingUser.id,
        userdata,
      );
      return updatedUser;
    }
    return await this.userAuthRepository.createUser(userdata);
  }

  // this is the verifyUser function which will be used to verify the user using otp and generate access token and refresh token
  async verifyUser(email: string, otp: string): Promise<any> {
    if (!email || !otp) {
      throw new apiError(400, "Email and OTP are required for verification");
    }
    const existingUser = await this.userAuthRepository.findUserByEmail(email);
    if (!existingUser) {
      throw new apiError(404, "User Not found");
    }
    if (existingUser?.otp !== otp) {
      throw new apiError(400, "Invalid Otp");
    }
    if (
      existingUser?.otpExpireTime &&
      existingUser?.otpExpireTime.getTime() < Date.now()
    ) {
      throw new apiError(410, "OTP has expired");
    }
    const accessToken = generateToken(existingUser?.id);
    const refreshToken = generateRefreshToken(existingUser?.id);
    const data = {
      isVerified: true,
      otp: null,
      otpExpireTime: null,
      refreshToken: refreshToken,
    };
    const user = await this.userAuthRepository.updateUser(
      existingUser?.id,
      data,
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    };
  }

  // this is the login function which will be used to login the user and generate access token and refresh token
  async login(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new apiError(400, "Email and Password are required for login");
    }
    const user = await this.userAuthRepository.findUserByEmail(email);
    if (!user) {
      throw new apiError(404, "User Not found");
    }

    if (!user.isVerified) {
      throw new apiError(
        403,
        "Account does not exist with this email or is not verified",
      );
    }
    const isPasswordValid = await hashPassword.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new apiError(401, "Invalid email or password");
    }

    const accessToken = generateToken(user?.id);
    const refreshToken = generateRefreshToken(user?.id);
    const data = {
      refreshToken: refreshToken,
    };
    await this.userAuthRepository.updateUser(user?.id, data);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  // this function basicallu used to handle the change   password
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    if (!userId || !oldPassword || !newPassword) {
      throw new apiError(
        400,
        "UserId,OldPassword and NewPassword are required for change password",
      );
    }

    const user = await this.userAuthRepository.findUserById(userId);
    if (!user) {
      throw new apiError(404, "User Not found");
    }

    const isPasswordValid = await hashPassword.comparePassword(
      oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new apiError(400, "Invalid old password");
    }
    const hashedNewPassword = await hashPassword.hashPassword(newPassword);
    const updatedUser = await this.userAuthRepository.updateUser(userId, {
      password: hashedNewPassword,
    });
    return updatedUser;
  }

  // to generate the new token
  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new apiError(400, "Refresh token not found");
    }
    const decode = jwt.verify(
      refreshToken,
      process.env.RFFRESH_TOKEN_SECRETE as string,
    ) as { id: string };
    const user = await this.userAuthRepository.findUserById(decode?.id);

    if (!user) {
      throw new apiError(404, "user not found");
    }
    if (user?.refreshToken !== refreshToken) {
      throw new apiError(403, "Invalid refresh token");
    }
    const accessToken = generateToken(user?.id);
    const newRefreshToken = generateRefreshToken(user?.id);
    const updatedUser = await this.userAuthRepository.updateUser(user?.id, {
      refreshToken: newRefreshToken,
    });
    return {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string) {
    const user = await this.userAuthRepository.findUserById(userId);
    if (!user) {
      throw new apiError(404, "user not found");
    }
    const updatedUser = await this.userAuthRepository.updateUser(userId, {
      refreshToken: null,
    });
    return updatedUser;
  }
}

export default AuthServices;
 