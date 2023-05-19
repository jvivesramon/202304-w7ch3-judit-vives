import express from "express";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorControllers/errorControllers.js";
import { userRouter } from "./routers/user/userRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
