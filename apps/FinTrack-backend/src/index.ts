import express from "express";
import errorHandler from "./middleware/errorHandler.ts";
import dotenv from "dotenv";
import routes from "./routes/routes.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);

app.options("*", cors()); // Enable pre-flight requests for all routes
app.use(cookieParser());
dotenv.config();
const port: number = parseInt(process.env.PORT || "3000", 10);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
