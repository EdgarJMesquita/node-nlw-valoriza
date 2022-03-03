import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}
class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    if (!name) {
      throw new Error("Missing name");
    }
    if (!email) {
      throw new Error("Missing email");
    }
    if (!password) {
      throw new Error("Missing password");
    }

    const usersRepository = getCustomRepository(UsersRepositories);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
