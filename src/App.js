import {
  Box,
  createTheme,
  CssBaseline, Stack,
  ThemeProvider,
} from '@mui/material';
import './App.css';
import {AliasAppBar} from './components/AppBar';
import {useSelector} from 'react-redux';
import AccountSettingDialog from './components/AccountSettingDialog';
import {useEffect, useState} from 'react';
import {MINUTE_MS} from './constants/misc';
import {
  GetAllRooms,
  HandShakeWithApi,
} from './client/client';
import {RoomCard} from './components/RoomCard';

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
      HandShakeWithApi();
      getRooms().catch(err => console.log(err));
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <AliasAppBar/>
          <AccountSettingDialog/>
          <Box sx={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Stack spacing={2}>
              {rooms ? rooms.map(obj => {
                return <RoomCard key={obj['room_id']} RoomId={obj['room_id']}
                                 PlayerNumber={obj['user_list'].length}/>;
              }) : null}
            </Stack>
          </Box>
        </div>
      </ThemeProvider>
  );
}

export default App;
