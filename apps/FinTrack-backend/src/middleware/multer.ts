import storage from "../config/multer.config.ts";
import multer from "multer";

const uploads = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}); // Maximum 10 files

export default uploads;
