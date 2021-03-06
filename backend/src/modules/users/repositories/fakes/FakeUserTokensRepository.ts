import { uuid } from 'uuidv4';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const useToken = new UserToken();

        Object.assign(useToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            updated_at: new Date(),
            created_at: new Date(),
        });

        this.userTokens.push(useToken);

        return useToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(
            findedToken => findedToken.token === token,
        );

        return userToken;
    }
}

export default FakeUserTokensRepository;
