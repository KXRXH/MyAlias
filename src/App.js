import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import './App.css';
import {AliasAppBar} from './components/AppBar';
import {useSelector} from 'react-redux';
import AccountSettingDialog from './components/AccountSettingDialog';
import {useEffect, useState} from 'react';
import {MINUTE_MS} from './constants/misc';
import {
  GetAllRooms, HandShakeWithApi,
} from './client/client';
import {RoomStack} from './components/RoomStack';
import {GetSessionUser} from './utils/utils';
import {DisconnectButton} from './components/DisconnectButton';

HandShakeWithApi();

function App() {
  const [rooms, setRooms] = useState('');
  const currentTheme = useSelector(state => state.themeState);
  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });
  useEffect(() => {
    const getRooms = async () => {
      const rooms = await GetAllRooms();
      setRooms(rooms['rooms']);
    };
    getRooms().catch(err => console.log(err));
    const interval = setInterval(() => {
      getRooms().catch(err => console.log(err));
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <AliasAppBar/>
          {GetSessionUser()['room_id'] ? <DisconnectButton/> : <RoomStack
              rooms={rooms}/>}
          <AccountSettingDialog/>
        </div>
      </ThemeProvider>
  );
}

export default App;
