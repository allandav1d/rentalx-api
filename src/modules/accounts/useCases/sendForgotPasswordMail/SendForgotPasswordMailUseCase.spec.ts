import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  })

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "351988",
      email: "zab@poesikuh.as",
      name: "Russell Townsend",
      password: "123456"
    })

    await sendForgotPasswordMailUseCase.execute("zab@poesikuh.as")

    expect(sendMail).toHaveBeenCalled();
  })

  it("should not be able to send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("uveorohi@relzo.ly")
    ).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "147854",
      email: "ifiahejew@gogwut.lu",
      name: "Antonio Barnes",
      password: "123456"
    })

    await sendForgotPasswordMailUseCase.execute("ifiahejew@gogwut.lu")

    expect(generateTokenMail).toHaveBeenCalled();
  })

})