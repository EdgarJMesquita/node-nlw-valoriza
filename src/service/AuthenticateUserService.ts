import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
const key = process.env.key;
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

    if (!key) {
      console.log("Missing environment variables!");
      return;
    }

    const token = sign(payload, key, {
      subject: user.id,
      expiresIn: "1d",
    });
    return token;
  }
}

export { AuthenticateUserService };
