import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUsersRepository) { }

  execute({ email, name }: IRequest): User {
    if (!name) throw new Error("Name must be valid!");
    if (!email) throw new Error("E-mail must be valid!");

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
