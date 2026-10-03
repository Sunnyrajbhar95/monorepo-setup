import cloudinary from "../../config/cloudinary.config.ts";
import { promises as fsPromises } from "fs";
import fs from "fs";

async function uploadCloudinary(filepath: string, folder: string = "uploads") {
  try {
    if (!filepath) {
      throw new Error("File path is required");
    }
    const response = await cloudinary.uploader.upload(filepath, {
      folder,
      resource_type: "image",
    });
    return response;
  } catch (error: any) {
    throw error;
  } finally {
    if (fs.existsSync(filepath)) {
      await fsPromises.unlink(filepath);
    }
  }
}
export default uploadCloudinary;
