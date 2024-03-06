import { Router } from "express";
import UserController from "../controllers/admin.controllers";
const userRoute = new UserController();

export const userRoutes: Router = Router();
userRoutes
  .get("/users/", userRoute.getUser)
  .get("/users/:id", userRoute.getUser)
  .post("/", userRoute.addUser)
  .put("/users/:id", userRoute.putUser)
  .delete("/users/:id", userRoute.deleteUser);
