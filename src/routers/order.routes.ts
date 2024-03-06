import { Router } from "express";
import order from "../controllers/order.controllers";
import { AUTH } from "../middlewares/auth";
export const orderRouter: Router = Router();
orderRouter
  .get("/:id", AUTH, order.GET)
  .get("/", AUTH, order.GET)
  .post("/", AUTH, order.POST)
  .put("/:id", AUTH, order.PUT)
  .delete("/:id", AUTH, order.DELETE);
