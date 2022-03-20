import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })

    this.usersTokens.push(userToken);

    return userToken
  }
  async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === token);
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken), 1);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    return userToken;
  }


}

export { UsersTokensRepositoryInMemory }