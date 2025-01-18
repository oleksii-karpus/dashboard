import { localStorageService } from '../local-storage';
import { LoginDto } from '../../common/dto/login.dto';
import { AppResponse } from '../../common/types/app.response';
import { PublicUser } from '../../common/types/user/public.user';
import { ErrorMessages } from '../../common/enums/error.messages';
import { ApplicationException } from '../../exception/application.exception';
import { userService } from '../user';

class AuthService {
    #defaultAdminName = 'admin';
    #defaultAdminPassword = 'admin123';
    #defaultUserId = '1';
    #localStorageUserKey = 'user';

    #isValidCredentials({ name, password }: LoginDto): boolean {
        return name.toLowerCase() === this.#defaultAdminName && password === this.#defaultAdminPassword;
    }

    getCurrentUser(): AppResponse<PublicUser | null> {
        return {
            data: localStorageService.getObject(this.#localStorageUserKey)
        };
    }

    async login(payload: LoginDto): Promise<AppResponse<PublicUser>> {
        if (this.#isValidCredentials(payload)) {
            const { data } = await userService.getUserById(this.#defaultUserId);
            const user: PublicUser = {
                ...data,
                name: this.#defaultAdminName,
                id: this.#defaultUserId
            };
            localStorageService.setObject(this.#localStorageUserKey, user);

            return { data: user };
        }

        throw ApplicationException.badRequest(ErrorMessages.InvalidLogin);
    }

    logout(): AppResponse<boolean> {
        localStorageService.remove(this.#localStorageUserKey);
        return {
            data: true
        };
    }
}

export const authService = new AuthService();
