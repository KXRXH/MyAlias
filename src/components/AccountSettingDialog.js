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

export default function AccountSettingDialog() {
  const [nickNameInput, setNickNameInput] = useState('');
  const accDialogState = useSelector(state => state.ACCOUNT_DIALOG_STATE);
  const userNickName = useSelector(state => state.NICK_NAME);
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////////
  const handleTextInputChange = event => {
    setNickNameInput(event.target.value);
  };
  const handleClose = () => {
    if (nickNameInput.length > 0) {
      dispatch(setNickName(nickNameInput));
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
                label="NickName"
                type="name"
                fullWidth
                variant="standard"
                required={true}
                defaultValue={userNickName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseWithoutSave}>Discard</Button>
            <Button onClick={handleClose}>Save and close</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
