import { Request, Response } from "express";

import { main } from "../utils/db";
export default {
  GET: async (req: Request, res: Response) => {
    try {
      const id: number = +req.params?.id;
      const foodModel = await main();
      let result;
      if (id) result = await foodModel.food.findUnique({ where: { id } });
      else result = await foodModel.food.findMany();
      res.send({ status: 200, data: result, message: "food" });
    } catch (error: unknown) {
      res.send({ status: 404, data: null, message: error });
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { title, price, description, now } = req.body;
      const foodModel = await main();
      if (!title || !price || !description) throw new Error("Wrong complated!");
      const newfood = await foodModel.food.create({
        data: { title, price, description, now: now ? now : false },
      });
      res.send({
        status: 201,
        data: newfood,
        message: "created food successeful",
      });
    } catch (error: unknown) {
      res.send({ status: 429, data: null, message: error });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const id: number = +req.params?.id;
      if (!id) throw new Error("Not found food's id!");

      const { title, price, description, now } = req.body;
      const foodModel = await main();
      if (!title && !price && !description) throw new Error("Wrong complated!");
      const food = await await foodModel.food.findUnique({ where: { id } });
      if (!food) throw new Error("Not found food = " + id);
      const result = await foodModel.food.update({
        where: { id },
        data: { title, price, description, now },
      });
      res.send({
        status: 200,
        data: result,
        message: "updated successeful",
      });
    } catch (error: any) {
      res.send({ status: 400, data: null, message: error.message });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const id: number = +req.params?.id;
      const foodModel = await main();
      if (!id) throw new Error("Not found food's id!");
      const food = await await foodModel.food.findUnique({ where: { id } });
      if (!food) throw new Error("Not found food = " + id);
      const result = await foodModel.food.delete({ where: { id } });
      res.send({ status: 200, data: result, message: "delete food = " + id });
    } catch (error: unknown) {
      res.send({ status: 429, data: null, message: error });
    }
  },
};
