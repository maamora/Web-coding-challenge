import { Router } from "express";
import taskRoutes from "./task";


const appRouter = Router()

appRouter.use("/tasks", taskRoutes);

export default appRouter