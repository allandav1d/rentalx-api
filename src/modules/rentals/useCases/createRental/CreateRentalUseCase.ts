import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) { }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHours = 24;
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable for rental');
    }

    const retalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

    if (retalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHours) {
      throw new AppError("The rental must be at least 24 hours");
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental;
  }
}

export { CreateRentalUseCase };