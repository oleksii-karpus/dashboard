import { AppResponse } from '../../common/types/app.response';
import { PublicUser } from '../../common/types/user/public.user';
import { axiosAdapter } from '../../common/api/axios.adapter';
import { ResponseUserDto } from '../../common/types/user/response.user.dto';
import { ApplicationException } from '../../exception/application.exception';
import { ErrorMessages } from '../../common/enums/error.messages';
import { localStorageService } from '../local-storage';
import { userMapper } from './user.mapper';

class UserService {
    #accountsStorageKey = 'accounts';

    #getLocalAccounts(): PublicUser[] {
        return localStorageService.getObject(this.#accountsStorageKey) || [];
    }

    #updateLocalAccounts(updatedUser: PublicUser): void {
        const localAccounts = this.#getLocalAccounts();
        const updatedAccounts = localAccounts.filter(account => account.id !== updatedUser.id);
        localStorageService.setObject(this.#accountsStorageKey, [...updatedAccounts, updatedUser]);
    }

    async getUserById(id: string): Promise<AppResponse<PublicUser | null>> {
        const localAccounts = this.#getLocalAccounts();
        const localUser = localAccounts.find(account => Number(account.id) === Number(id));
        if (localUser) {
            return { data: localUser };
        }

        const { data } = await axiosAdapter.doGet<ResponseUserDto>({ url: `/users/${id}` });
        if (data) {
            const user = userMapper.mapResponseDtoToUser(data);
            this.#updateLocalAccounts(user);
            return { data: user };
        }
        throw ApplicationException.badRequest(ErrorMessages.NotFound);
    }

    async updateAccount(updatedData: PublicUser): Promise<AppResponse<PublicUser>> {
        const { data } = await axiosAdapter.doPut<ResponseUserDto>({
            url: `/users/${updatedData.id}`,
            payload: updatedData
        });

        const updatedUser = userMapper.mapResponseDtoToUser(data);
        this.#updateLocalAccounts(updatedUser);
        return { data: updatedUser };
    }
}

export const userService = new UserService();
