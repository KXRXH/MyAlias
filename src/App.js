import {
  createTheme,
  CssBaseline, Fab,
  ThemeProvider, Typography,
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
  const userNickName = useSelector(state => state.NICK_NAME);
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
  if (!sessionStorage.getItem('user')) {
    sessionStorage.setItem('user',
        JSON.stringify(
            {'id': 0, 'nickname': userNickName, 'room_id': 0, 'team': 0, 'status': false}));
  }
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <AliasAppBar state={GetSessionUser()['room_id']}/>
          {GetSessionUser()['room_id'] ? <DisconnectButton/> : <RoomStack
              rooms={rooms}/>}
          <AccountSettingDialog/>

        </div>
      </ThemeProvider>
  );
}

export default App;
