import express, { Express } from "express";
import { AUTH } from "./middlewares/auth";
import { foodRouter } from "./routers/food.routes";
import { orderRouter } from "./routers/order.routes";
import { userRoutes } from "./routers/admin.routes";
import { userRouter } from "./routers/users.routes";
import router from "./swagger/swagger";
import { main } from "./utils/db";
import { config } from "dotenv";
config();

const app: Express = express();
const PORT = process.env.PORT || 4554;
app.use(express.json());
app.use(router);
app.use("/admin", AUTH, userRoutes);
app.use("/users", userRouter);
app.use("/foods", foodRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log("⚡️[server]: Server is running at http://localhost:" + PORT);
});
