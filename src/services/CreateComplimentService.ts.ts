import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { TagRepositories } from "../repositories/TagRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ComplimentRequest {
  tag_id: number;
  user_sender: number;
  user_receiver: number;
  message: string;
}
class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: ComplimentRequest) {
    const complimentRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver)
      throw new Error("Incorrect user receiver");

    const userReceiverExists = await userRepositories.findOne({
      id: Number(user_receiver),
    });

    if (!userReceiverExists) throw new Error("User receiver does not exists");

    const tagRepositories = getCustomRepository(TagRepositories);
    const tagExists = await tagRepositories.findOne({ id: Number(tag_id) });
    if (!tagExists) throw new Error("Incorrect tag_id");

    const compliment = complimentRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
