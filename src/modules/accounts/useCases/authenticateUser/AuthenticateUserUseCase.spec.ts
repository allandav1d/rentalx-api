import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "123456789",
      email: "user@test.com",
      password: "123456",
      name: "User Test"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  })

  it("Should not be able to authenticate an non-existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  })

  it("Should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "123456789",
      email: "user@test.com",
      password: "123456",
      name: "User Test"
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password',
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  })


})