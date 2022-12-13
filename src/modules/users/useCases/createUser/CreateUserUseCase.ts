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

    const existingUser = this.usersRepository.findByEmail(email);
    if (existingUser) throw new Error("User e-mail already in use");

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
