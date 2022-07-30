import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAccountDialogState,
  setNickName,
} from '../store/actions';
import {useState} from 'react';
import {GetSessionUser, UpdateUser} from '../utils/utils';

export default function AccountSettingDialog() {
  const accDialogState = useSelector(state => state.ACCOUNT_DIALOG_STATE);
  const userNickName = useSelector(state => state.NICK_NAME);
  const [nickNameInput, setNickNameInput] = useState(userNickName);
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////////
  const handleTextInputChange = event => {
    setNickNameInput(event.target.value);
  };
  const handleClose = () => {
    if (nickNameInput.length > 0) {
      dispatch(setNickName(nickNameInput));
      const user = GetSessionUser();
      user['nickname'] = nickNameInput;
      UpdateUser(user);
      localStorage.setItem('userNickName', nickNameInput);
      dispatch(setAccountDialogState(false));
    }
  };
  const handleCloseWithoutSave = () => {
    dispatch(setAccountDialogState(false));
  };
  return (
      <div>
        <Dialog open={accDialogState} onClose={handleClose}>
          <DialogTitle>User settings</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your in game nickname
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                value={nickNameInput}
                onChange={handleTextInputChange}
                id="name"
                label="Your nickname"
                type="name"
                fullWidth
                variant="standard"
                required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error"
                    onClick={handleCloseWithoutSave}>Discard</Button>
            <Button variant="outlined" color="success" onClick={handleClose}>
              Save and close</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
