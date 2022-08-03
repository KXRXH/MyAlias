import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import './App.css';
import {AliasAppBar} from './components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import AccountSettingDialog from './components/AccountSettingDialog';
import {useEffect} from 'react';
import {
  HandShakeWithApi,
} from './client';
import {RoomStack} from './components/RoomStack';
import {GetSessionUser, UpdateState} from './utils/utils';
import {GameScreen} from './components/GameScreen';
import {INTERVAL_BACKGROUND, INTERVAL_MAIN} from './constants/misc';

HandShakeWithApi();

function App() {
  const currentTheme = useSelector(state => state.themeState);
  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });
  const mainState = useSelector(state => state.mainState);
  const userNickName = useSelector(state => state.nickName);
  const dispatch = useDispatch();
  // GENERATE_SOURCEMAP=false
  useEffect(() => {
    UpdateState(dispatch);
    const interval = setInterval(() => {
      UpdateState(dispatch);
    }, GetSessionUser()['room_id'] ? INTERVAL_BACKGROUND : INTERVAL_MAIN);
    return () => clearInterval(interval);
  }, [dispatch]);
  if (!sessionStorage.getItem('user')) {
    sessionStorage.setItem('user',
        JSON.stringify(
            {
              'id': -1,
              'nickname': userNickName,
              'room_id': 0,
              'team': 0,
              'status': false,
            }));
  }
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <AliasAppBar state={GetSessionUser()['room_id']}/>
          {GetSessionUser()['room_id'] ? <GameScreen
              RoomID={GetSessionUser()['room_id']}/> : <RoomStack
              rooms={mainState}/>}
          <AccountSettingDialog/>
        </div>
      </ThemeProvider>
  );
}

export default App;
