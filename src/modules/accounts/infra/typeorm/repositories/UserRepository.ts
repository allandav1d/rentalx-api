import { getRepository, Repository } from "typeorm";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";

import { User } from "../entities/user";



class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driver_license, password, avatar, id }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name, email, driver_license, password, avatar, id
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }


}

export { UsersRepository };