import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

import './App.css';
import {AliasAppBar} from "./components/AppBar";
import {useSelector} from "react-redux";




function App() {
  const currentTheme = useSelector(state => state.themeState);
  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <AliasAppBar />
        </div>
      </ThemeProvider>
  );
}

export default App;
