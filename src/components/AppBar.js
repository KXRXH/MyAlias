import {
  AppBar, Box, FormControlLabel, IconButton,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setAccountDialogState, setThemeState} from '../store/actions';
import {capitalizeFirstLetter, GetRandomRainbowColor} from '../utils/utils';
import {DarkAppBarColor, LightAppBarColor} from '../constants/colors';
import {useState} from 'react';
import AccountSettingDialog from './AccountSettingDialog';
import EditIcon from '@mui/icons-material/Edit';

export function AliasAppBar() {
  const [nameColor, setNameColor] = useState('inherit');
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.themeState);
  const userNickName = useSelector(state => state.NICK_NAME);
  /////////////////////////////////////////////////////////////////
  const ChangeTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    dispatch(setThemeState(newTheme));
    localStorage.setItem('themePreferences', newTheme);
    setNameColor('inherit');
  };
  const handleClickOpen = () => {
    dispatch(setAccountDialogState(true));
  };
  /////////////////////////////////////////////////////////////////
  return (
      <AppBar position="static" style={{
        backgroundColor: currentTheme === 'dark' ?
            DarkAppBarColor :
            LightAppBarColor,
      }}>
        <Toolbar>
          <Typography variant="h6" color={nameColor} onClick={() => {
            setNameColor(currentTheme === 'dark' && nameColor === 'inherit' ?
                GetRandomRainbowColor() :
                'inherit');
          }}>Alias</Typography>
          <Box sx={{
            display: 'flex',
            marginLeft: 'auto',
            alignItems: 'center',
          }}>
            <Typography variant="h6" sx={{
              marginRight: '1px',
            }}>{userNickName}</Typography>
            <IconButton color="inherit" onClick={handleClickOpen}>
              <EditIcon/>
            </IconButton>
            <AccountSettingDialog/>
            <FormControlLabel
                value="bottom"
                sx={{
                  marginLeft: '10px',
                  alignItems: 'center',
                }}
                control={<Switch
                    color="secondary"
                    checked={currentTheme === 'dark'}
                    onChange={ChangeTheme}
                    inputProps={{'aria-label': 'controlled'}}
                />}
                label={capitalizeFirstLetter(currentTheme)}
                labelPlacement="start"/>
          </Box>
        </Toolbar>
      </AppBar>
  );
}