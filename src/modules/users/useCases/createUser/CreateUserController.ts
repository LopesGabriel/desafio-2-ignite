import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createUserUseCase: CreateUserUseCase) { }

  handle(request: Request, response: Response): Response {
    const { email, name } = request.body;
    const newUser = this.createUserUseCase.execute({ email, name });
    return response.status(201).json(newUser);
  }
}

export { CreateUserController };
