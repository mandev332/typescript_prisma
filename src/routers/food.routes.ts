import { Router } from "express";
import food from "../controllers/food.controllers";
import { AUTH } from "../middlewares/auth";
export const foodRouter: Router = Router();
foodRouter
  .get("/:id", food.GET)
  .get("/", food.GET)
  .post("/", AUTH, food.POST)
  .put("/:id", AUTH, food.PUT)
  .delete("/:id", AUTH, food.DELETE);
