import fs from "fs";
import path from "path";
import multer from "multer";
const filepath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(filepath)) {
  fs.mkdirSync(filepath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});


export default storage
