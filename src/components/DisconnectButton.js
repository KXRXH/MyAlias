import Button from '@mui/material/Button';
import {DeleteRoom, DisconnectFromRoom} from '../client/client';
import {useDispatch, useSelector} from 'react-redux';
import {GetSessionUser, UpdateState} from '../utils/utils';

export function DisconnectButton() {
  const dispatch = useDispatch();
  const handleClickDisconnect = () => {
    const user = GetSessionUser();
    DisconnectFromRoom().
        then(() => DeleteRoom(user['room_id']).
            then(() => UpdateState(dispatch)));
  };
  return (
      <Button onClick={handleClickDisconnect}
              sx={{
                display: 'flex',
                marginLeft: 'auto',
                marginTop: '10px',
                marginRight: '10px',
              }} color="secondary" variant="outlined">Disconnect
      </Button>
  );
}