import express from "express";
import billControllers from "../../controllers/billControllers/billControllers.ts";
import userAuth from "../../middleware/AuthMiddleware.ts";
import upload from "../../middleware/multer.ts";
import validate from "../../middleware/validate.ts";
import bill from "../../validators/bill.validator.ts";
const billRoutes = express.Router();

billRoutes.post(
  "/add-bill",
  userAuth,
  upload.single("reciept"),
  validate(bill),
  (req, res, next) => {
    console.log(req.body);
    console.log("galat body aa rahi hai");
    next();
  },
  
  billControllers.addBill,
);

export default billRoutes;
