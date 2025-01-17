import {createTheme} from "@mui/material";
import {ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#ce93d8',
        },
        background: {
            default: '#121212',
            paper: '#121212',
        },
        divider: '#30373d',
    },
    shape: {
        borderRadius: 8,
    },
};

export const theme = createTheme(themeOptions)
