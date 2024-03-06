import express, { Handler } from "express";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";

let swaggerDocument: any = null;

const prepareSwaggerDoc: Handler = async (req, res, next) => {
  const pathuser = "./src/swagger/user.doc.json";
  const datauser = await readFile(pathuser);
  swaggerDocument = JSON.parse(datauser.toString("utf8"));
  (req as any).swaggerDoc = swaggerDocument;
  next();
};
const router = express.Router();

router.use("/docs", prepareSwaggerDoc, swaggerUi.serve, swaggerUi.setup());

export default router;
