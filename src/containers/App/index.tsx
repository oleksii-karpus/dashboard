import { CssBaseline, ThemeProvider } from '@mui/material';
import Routing from '../Routing';
import { theme } from '../../styles/theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routing />
        </ThemeProvider>
    );
};

export default App;
