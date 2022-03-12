import { instanceToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceivedComplimentsService {
  async execute(user_id: number) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });
    return instanceToPlain(compliments);
  }
}

export { ListUserReceivedComplimentsService };
