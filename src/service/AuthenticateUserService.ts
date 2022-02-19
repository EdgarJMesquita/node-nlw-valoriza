import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserService) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new Error("Email/Password incorrect");
    }

    const payload = {
      email: user.email,
    };
    const token = sign(payload, "5055fded3f0f7b0dddcd5afc0d09b3f3", {
      subject: user.id,
      expiresIn: "1d",
    });
    return token;
  }
}

export { AuthenticateUserService };
