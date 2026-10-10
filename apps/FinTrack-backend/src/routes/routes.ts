import express from "express";
const routes = express.Router();
import authRoutes from "./authRoutes/authRoutes.ts";
import expenseRouter from "./expenseRoutes/expenseRoutes.ts";
import billRoutes from "./billRoutes/billRoutes.ts";

routes.use("/auth", authRoutes);
routes.use("/expense", expenseRouter);
routes.use("/bill", billRoutes);

export default routes;
