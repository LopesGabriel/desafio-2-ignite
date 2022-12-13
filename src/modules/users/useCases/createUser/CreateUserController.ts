import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createUserUseCase: CreateUserUseCase) { }

  handle(request: Request, response: Response): Response {
    const { email, name } = request.body;
    try {
      const newUser = this.createUserUseCase.execute({ email, name });
      return response.status(201).json(newUser);
    } catch (err) {
      let message = "Failed to process request";

      if (err.message === "User e-mail already in use") {
        message = err.message;
      }

      return response.status(400).json({ error: message });
    }
  }
}

export { CreateUserController };
