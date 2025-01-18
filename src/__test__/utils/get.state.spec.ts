import { RootState } from '../../store/types/root.state';
import { getAppState } from '../../utils/get.state.utils';

describe('getAppState', () => {
    it('should return the app state', () => {
        const mockState: RootState = {
            app: {
                isLoading: false,
                user: { id: '1', name: 'Test User' },
                notification: {
                    message: '',
                    severity: 'success',
                    open: false
                },
                errors: {}
            },
            dashboard: {
                account: null
            }
        };

        expect(getAppState(mockState)).toEqual(mockState.app);
    });

    it('should return default app state when state is empty', () => {
        const mockState = {
            app: undefined
        } as unknown as RootState;

        expect(getAppState(mockState)).toBeUndefined();
    });

    it('should reflect updated app state', () => {
        const updatedState: RootState = {
            app: {
                isLoading: true,
                user: null,
                notification: {
                    message: 'Loading...',
                    severity: 'success',
                    open: true
                },
                errors: {}
            },
            dashboard: {
                account: null
            }
        };

        expect(getAppState(updatedState)).toEqual(updatedState.app);
    });
});
