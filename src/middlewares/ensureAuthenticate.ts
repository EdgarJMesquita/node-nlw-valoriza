import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticate(
  request: Request,
  response: Response,
  nextFunction: NextFunction
) {
  const token = request.headers.authorization;
  console.log(token);

  if (!token) {
    throw new Error("Missing token");
  }

  return nextFunction();
}
