import { Request, Response } from "express";
import { CreateUserService } from "../service/CreateUserService";
import { hash } from "bcryptjs";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;
    const passwordHash = await hash(password, 8);
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      admin,
      password: passwordHash,
    });
    return response.json({
      name,
      email,
      admin,
    });
  }
}

export { CreateUserController };
