import { Response, Request } from 'express';
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticateInfo = await authenticateUserUseCase.execute({ email, password });

    return res.status(201).json(authenticateInfo);
  }
}

export { AuthenticateUserController };