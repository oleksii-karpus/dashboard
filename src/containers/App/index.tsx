import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Routing from '../Routing';
import { theme } from '../../styles/theme';
import store from '../../store';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routing />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
