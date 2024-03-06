import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "@prisma/client";
config();

const Secret = process.env.SECRET;
function AUTH(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Token Not Found");
    const user = jwt.verify(token, Secret || "");
    req.body["user"] = user;
    return next();
  } catch (error: unknown) {
    res.send({ status: 401, message: error });
  }
}
function SIGN(id: number): string {
  try {
    return jwt.sign({ id }, Secret || "");
  } catch (error: unknown) {
    return "";
  }
}
export { AUTH, SIGN };
