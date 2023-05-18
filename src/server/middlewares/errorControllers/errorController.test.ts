import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { notFoundError } from "./errorControllers";

describe("Given an errorController controller", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with the custom error with status code 404 and message 'Endpoint not found'", () => {
      const req = {};
      const res = {};

      const next = jest.fn();

      const customError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
