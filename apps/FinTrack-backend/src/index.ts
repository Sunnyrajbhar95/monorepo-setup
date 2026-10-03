import express from "express";
import errorHandler from "./middleware/errorHandler.ts";
import dotenv from "dotenv";
import routes from "./routes/routes.ts";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
dotenv.config();
const port: number = parseInt(process.env.PORT || "3000", 10);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 

app.use("/api/v1",routes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
