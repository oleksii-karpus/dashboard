import { ResponseUserDto } from '../../common/types/user/response.user.dto';

class UserMapper {
    mapResponseDtoToUser(data: ResponseUserDto) {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: {
                street: data.address.street,
                suite: data.address.suite,
                city: data.address.city,
                zipcode: data.address.zipcode
            }
        };
    }
}

export const userMapper = new UserMapper();
