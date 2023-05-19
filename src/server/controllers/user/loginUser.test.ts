import { type UserCredentialsRequest } from "../../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usernameMock } from "../../../data/mocks.js";
import User from "../../../database/models/User.js";
import { loginUser } from "./loginUser";
import { type Response } from "express";

beforeAll(() => {
  jest.clearAllMocks();
});

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given an loginUser controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call the response method status with a 200", async () => {
      const expectedStatusCode = 200;
      const token = "token";

      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req: Pick<UserCredentialsRequest, "body"> = {
        body: {
          username: "Jud",
          password: "password",
        },
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(usernameMock),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
