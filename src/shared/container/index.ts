
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository"
import { container } from "tsyringe"
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";


// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)

container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository)

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)