import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  // eslint-disable-next-line prettier/prettier
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const user = this.turnUserAdminUseCase.execute({ user_id });
      return response.json(user);
    } catch (err) {
      let message = "Failed to process the request";
      let status = 400;

      if (err.message === "User not found") {
        message = err.message;
        status = 404;
      }

      return response.status(status).json({ message, error: true });
    }
  }
}

export { TurnUserAdminController };
