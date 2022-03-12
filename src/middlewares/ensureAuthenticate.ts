import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) {
    return response.status(401).end();
  }
  if (!process.env.KEY) {
    return response.status(500).end();
  }

  const [_, token] = auth.split(" ");

  try {
    const decode = verify(token, process.env.KEY) as IPayload;
    request.user_id = decode.sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
