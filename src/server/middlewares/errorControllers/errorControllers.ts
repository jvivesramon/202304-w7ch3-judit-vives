import { type NextFunction, type Request, type Response } from "express";
import "../../../loadEnviroment.js";
import createDebug from "debug";
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
