import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const users = this.listAllUsersUseCase.execute({
        user_id: user_id as string,
      });

      return response.json(users);
    } catch (err) {
      let message = "Failed to process the request";

      if (
        err.message === "User is not admin" ||
        err.message === "User not found"
      ) {
        message = err.message;
      }

      return response.status(400).json({ message, error: true });
    }
  }
}

export { ListAllUsersController };
