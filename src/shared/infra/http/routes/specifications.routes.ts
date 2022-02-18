import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecifications/ListSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();


specificationsRoutes.get('/', listSpecificationController.handle);

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
