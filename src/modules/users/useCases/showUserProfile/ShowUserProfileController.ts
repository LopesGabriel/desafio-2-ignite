import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  // eslint-disable-next-line prettier/prettier
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    try {
      const user = this.showUserProfileUseCase.execute({ user_id });
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

export { ShowUserProfileController };
