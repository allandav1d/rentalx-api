import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationUseCase } from './ListSpecificationUseCase';

class ListSpecificationController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase);

    const all = await listSpecificationUseCase.execute();

    return res.status(200).json(all);
  }
}

export { ListSpecificationController };
