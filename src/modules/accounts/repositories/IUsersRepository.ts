import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../entities/user";


interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export default IUsersRepository;

export { IUsersRepository };