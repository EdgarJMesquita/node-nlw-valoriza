import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";

class ListTagService {
  async execute() {
    const tagRepositories = getCustomRepository(TagRepositories);
    const tags = await tagRepositories.find();
    return tags;
  }
}

export { ListTagService };
