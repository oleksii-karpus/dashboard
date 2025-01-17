import { PublicUser } from '../common/types/public.user';

export const useUser = (): { user: PublicUser | null; onLogout: () => void } => {
    const onLogout = () => {
        // eslint-disable-next-line no-console
        console.log('User logged out');
    };
    return {
        user: {
            name: 'John',
            id: '1'
        },
        onLogout
    };
};
