import { Types } from "mongoose";

export const usernameMock = {
  _id: new Types.ObjectId().toString(),
  username: "Jud",
  password: "hashed-password",
};
