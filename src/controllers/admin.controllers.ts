import { Request, Response } from "express";
import { Delete, Get, Post, Put, Route } from "tsoa";
import { main } from "../utils/db";

interface UserResponse {
  status: number;
  data: any;
  message: any;
}

type User = {
  username: string;
  contact: string;
  password: string;
  role: string;
};

@Route()
export default class UserController {
  @Get()
  public async getUser(req: Request, res: Response) {
    try {
      let user = req.body?.user;
      const userModel = await main();
      if (user) {
        user = await userModel.user.findUnique({ where: { id: user.id } });
      }
      if (!user || user.role != "admin")
        throw new Error("Not your permission!");
      const id: number = +req.params?.id;
      let result;
      if (id) result = await userModel.user.findUnique({ where: { id } });
      else result = await userModel.user.findMany();
      res.send({ status: 200, data: result, message: "users" });
    } catch (error: unknown) {
      res.send({ status: 401, data: null, message: error + "" });
    }
  }
  @Post()
  public async addUser(req: Request): Promise<UserResponse> {
    try {
      const newUser: User = req.body;
      const userModel = await main();
      const addUser = await userModel.user.create({ data: newUser });
      return { status: 201, data: addUser, message: "Add User" };
    } catch (error) {
      return { status: 404, data: null, message: error };
    }
  }
  @Put()
  public async putUser(req: Request): Promise<UserResponse> {
    try {
      const adminid: number = req.body.user?.id;
      const userModel = await main();
      const admin = await userModel.user.findUnique({ where: { id: adminid } });
      if (!admin /* check role */) throw new Error("You not ADMIN");
      const id: number = +req.params?.id;
      const changeUser: User = req.body;

      const findUser = await userModel.user.findUnique({ where: { id } });
      if (!findUser) throw new Error("User Not Found");
      const updateUser = await userModel.user.update({
        where: { id },
        data: {
          username: changeUser.username || findUser?.username,
          contact: changeUser.contact || findUser?.contact,
          password: changeUser.password || findUser?.password,
        },
      });
      return { status: 200, data: updateUser, message: "Change User " + id };
    } catch (error: unknown) {
      return { status: 404, data: null, message: error };
    }
  }
  @Delete()
  public async deleteUser(req: Request): Promise<UserResponse> {
    try {
      const adminid: number = req.body.user?.id;
      const userModel = await main();
      const admin = await userModel.user.findUnique({ where: { id: adminid } });
      if (!admin /* check role */) throw new Error("You not ADMIN");
      const id: number = +req.params?.id;
      const findUser = await userModel.user.findUnique({ where: { id } });
      if (!findUser) throw new Error("User Not Found");
      return { status: 200, data: null, message: "Delete User " + id };
    } catch (error) {
      return { status: 404, data: null, message: error };
    }
  }
}
