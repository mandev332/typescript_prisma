import { Router } from "express";
import user from "../controllers/users.controllers";
import { AUTH } from "../middlewares/auth";

export const userRouter: Router = Router();
userRouter
  .get("/", AUTH, user.GET)
  .post("/", user.POST)
  .put("/:id", AUTH, user.PUT)
  .delete("/:id", AUTH, user.DELETE);
