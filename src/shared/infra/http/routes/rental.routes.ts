import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalRoutes = Router();

const listRentalsByUserController = new ListRentalsByUserController();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle)
rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle)

export { rentalRoutes }