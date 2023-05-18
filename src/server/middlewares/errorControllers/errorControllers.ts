import "../../../loadEnviroment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug("users-api:server:middleware:errorControllers");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");

  debug(error.message);

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.red(error.message));

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Everything has explode";

  res.status(statusCode).json({ message });
};
