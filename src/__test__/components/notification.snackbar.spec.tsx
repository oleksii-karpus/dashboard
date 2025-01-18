import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NotificationSnackbar from '../../components/NotificationSnackbar';
import { notificationsRoutine } from '../../store/app/routines';
import rootReducer from '../../store/reducers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithStore = (state: any) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: state
    });

    store.dispatch = jest.fn();

    render(
        <Provider store={store}>
            <NotificationSnackbar />
        </Provider>
    );

    return store;
};

describe('NotificationSnackbar', () => {
    it('renders the snackbar with the correct message', () => {
        const state = {
            app: {
                notification: {
                    open: true,
                    message: 'Test Notification',
                    severity: 'success'
                }
            }
        };
        renderWithStore(state);
        expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    it('closes the snackbar when close button is clicked', async () => {
        const state = {
            app: {
                notification: {
                    open: true,
                    message: 'Test Notification',
                    severity: 'success'
                }
            }
        };

        const store = renderWithStore(state);

        fireEvent.click(screen.getByRole('button'));
        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(notificationsRoutine.fulfill());
        });
    });

    it('does not render the snackbar when open is false', () => {
        const state = {
            app: {
                notification: {
                    open: false,
                    message: 'Test Notification',
                    severity: 'success'
                }
            }
        };

        renderWithStore(state);

        expect(screen.queryByText('Test Notification')).not.toBeInTheDocument();
    });
});
