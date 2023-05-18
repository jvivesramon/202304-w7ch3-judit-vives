import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorControllers.js";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

const next = jest.fn();

const req = {};

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given an errorController controller", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with the custom error with status code 404 and message 'Endpoint not found'", () => {
      const customError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When it is called with an unknown error", () => {
    const error = new Error("Everything has explode");
    test("Then it should call the response's method status with code 500", () => {
      const statusCode = 500;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with code 500", () => {
      const { message } = error;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
