import jwt from "jsonwebtoken";
export const generateToken = (id: string) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRETE as string,{ expiresIn:"1hr" });
  return token;
};


export const generateRefreshToken=(id:string)=>{
  const refreshtoken = jwt.sign({ id: id }, process.env.RFFRESH_TOKEN_SECRETE as string,{ expiresIn:"7d" });
  return refreshtoken
}


