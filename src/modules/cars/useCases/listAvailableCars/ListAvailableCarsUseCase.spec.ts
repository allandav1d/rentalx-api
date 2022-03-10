import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Categoria bonito",
      daily_rate: 140.00,
      license_plate: "DEF-1478",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "3982af5e-7322-42be-9103-0c17ec8a6c7c"
    })

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Categoria bonito",
      daily_rate: 140.00,
      license_plate: "DEF-1478",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "3982af5e-7322-42be-9103-0c17ec8a6c7c"
    })

    const cars = await listAvailableCarsUseCase.execute({ brand: "Car brand" });

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Categoria bonito",
      daily_rate: 140.00,
      license_plate: "DEF-1478",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "3982af5e-7322-42be-9103-0c17ec8a6c7c"
    })

    const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Categoria bonito",
      daily_rate: 140.00,
      license_plate: "DEF-1478",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "3982af5e-7322-42be-9103-0c17ec8a6c7c"
    })

    const cars = await listAvailableCarsUseCase.execute({ category_id: "3982af5e-7322-42be-9103-0c17ec8a6c7c" });

    expect(cars).toEqual([car]);
  })
})