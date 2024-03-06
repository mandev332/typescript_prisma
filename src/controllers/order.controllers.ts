import { Request, Response } from "express";
import { main } from "../utils/db";

export default {
  GET: async (req: Request, res: Response) => {
    try {
      const id: number = +req.params?.id;
      const orderModel = await main();
      let result;
      if (id)
        result = await orderModel.order.findFirst({
          where: { id },
          select: { user: { select: { username: true } }, food: true },
        });
      else
        result = await orderModel.order.findMany({
          select: { user: true, food: true },
        });
      res.send({ status: 200, data: result, message: "order" });
    } catch (error: unknown) {
      res.send({ status: 404, data: null, message: error });
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { user_id, food_id } = req.body;
      const orderModel = await main();
      if (!user_id || !food_id) throw new Error("Wrong complated!");
      const neworder = await orderModel.order.create({
        data: { user_id, food_id },
      });
      res.send({
        status: 201,
        data: neworder,
        message: "created order successeful",
      });
    } catch (error: unknown) {
      res.send({ status: 429, data: null, message: error });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const id: number = +req.params?.id;
      if (!id) throw new Error("Not found order's id!");

      const { user_id, food_id } = req.body;
      const orderModel = await main();
      if (!user_id && !food_id) throw new Error("Wrong complated!");
      const order = await await orderModel.order.findUnique({ where: { id } });
      if (!order) throw new Error("Not found order = " + id);
      const result = await orderModel.order.update({
        where: { id },
        data: { user_id, food_id },
      });
      res.send({ status: 200, data: result, message: "updated successeful" });
    } catch (error: any) {
      res.send({ status: 400, data: null, message: error.message });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const id: number = +req.params?.id;
      const orderModel = await main();
      if (!id) throw new Error("Not found order's id!");
      const order = await await orderModel.order.findUnique({ where: { id } });
      if (!order) throw new Error("Not found order = " + id);
      const result = await orderModel.order.delete({ where: { id } });
      res.send({ status: 200, data: result, message: "delete order = " + id });
    } catch (error: unknown) {
      res.send({ status: 429, data: null, message: error });
    }
  },
};
