import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
isFinite

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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

  it("Should not be able to authenticate an non-existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456",
      })
    }).rejects.toBeInstanceOf(AppError);
  })

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        driver_license: "123456789",
        email: "user@test.com",
        password: "123456",
        name: "User Test"
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  })


})