import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import './App.css';
import {AliasAppBar} from './components/AppBar';
import {useSelector} from 'react-redux';
import AccountSettingDialog from './components/AccountSettingDialog';
import {useEffect, useState} from 'react';
import {MINUTE_MS} from './constants/misc';
import {GetAllRooms, HandShakeWithApi} from './client/client';

function App() {
  const currentTheme = useSelector(state => state.themeState);
  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      HandShakeWithApi();
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <AliasAppBar/>
          <AccountSettingDialog/>
        </div>
      </ThemeProvider>
  );
}

export default App;
