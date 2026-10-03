 export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
    profileImage?: string;
    isVerified: boolean;
    otp?: string;
   otpExpireTime?: Date;
   refresToken?: string;
   createdAt?: Date;
   updatedAt?: Date;
}