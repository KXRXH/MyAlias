import {
  AppBar, FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setThemeState} from '../store/actions';
import {capitalizeFirstLetter, GetRandomRainbowColor} from '../utils/utils';
import {DarkAppBarColor, LightAppBarColor} from '../constants/colors';
import {useState} from 'react';

export function AliasAppBar() {
  const [nameColor, setNameColor] = useState('inherit');
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.themeState);
  const ChangeTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    dispatch(setThemeState(newTheme));
    localStorage.setItem('themePreferences', newTheme);
    setNameColor('inherit');
  };
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
          <FormControlLabel
              value="bottom"
              sx={{
                marginLeft: 'auto',
                display: 'flex',
              }}
              control={<Switch
                  color="secondary"
                  checked={currentTheme === 'dark'}
                  onChange={ChangeTheme}
                  inputProps={{'aria-label': 'controlled'}}
              />}
              label={capitalizeFirstLetter(currentTheme)}
              labelPlacement="start"/>
        </Toolbar>
      </AppBar>
  );
}