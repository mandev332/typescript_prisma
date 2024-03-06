import { Request, Response } from "express";
import { SIGN } from "../middlewares/auth";

import { main } from "../utils/db";
export default {
  GET: async (req: Request, res: Response) => {
    try {
      const userModel = await main();
      const userId: number = req.body.user?.id;
      let result;
      if (userId) {
        result = await userModel.user.findUnique({ where: { id: userId } });
      }
      res.send({ status: 200, data: result, message: "users" });
    } catch (error: unknown) {
      res.send({ status: 404, data: null, message: error });
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { username, contact, password } = req.body;
      const userModel = await main();
      if (!username || !contact || !password)
        throw new Error("Wrong complated!");
      const newUser = await userModel.user.create({
        data: { username, contact, password },
      });
      res.send({
        status: 201,
        data: SIGN(newUser.id),
        message: "created user successeful",
      });
    } catch (error: unknown) {
      res.send({ status: 429, data: null, message: error });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const id: number = req.body.user?.id;
      if (!id) throw new Error("Not found user's id!");
      const { username, contact, password } = req.body;
      const userModel = await main();
      const user = await await userModel.user.findUnique({ where: { id } });
      if (!user) throw new Error("Not found user = " + id);
      if (!username && !contact && !password)
        throw new Error("Wrong complated!");
      const result = await userModel.user.update({
        where: { id },
        data: { username, contact, password },
      });
      res.send({
        status: 200,
        data: result,
        message: "updated successeful",
      });
    } catch (error: unknown) {
      res.send({ status: 200, data: null, message: error });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const id: number = req.body.user?.id;
      const userModel = await main();
      if (!id) throw new Error("Not found user's id!");
      const user = await await userModel.user.findUnique({ where: { id } });
      if (!user) throw new Error("Not found user = " + id);
      const result = await userModel.user.delete({ where: { id } });
      res.send({ status: 200, data: result, message: "delete user = " + id });
    } catch (error: unknown) {
      res.send({ status: 429, data: null, message: error });
    }
  },
};
