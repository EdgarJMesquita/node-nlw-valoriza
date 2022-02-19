import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ICreateTagService {
  name: string;
}

class CreateTagService {
  async execute({ name }: ICreateTagService) {
    if (!name) {
      throw new Error("Name field is required");
    }

    const tagRepositories = getCustomRepository(TagRepositories);

    const tagAlreadyExists = await tagRepositories.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Tag name already in use");
    }

    const tag = tagRepositories.create({
      name,
    });

    await tagRepositories.save(tag);
    return tag;
  }
}

export { CreateTagService };
