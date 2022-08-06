import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {GetSessionUser, UpdateState} from '../utils/utils';
import {DeleteRoom} from '../client/rooms';
import {DisconnectFromRoom} from '../client/user';
import {useNavigate} from 'react-router-dom';

export function DisconnectButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickDisconnect = () => {
    UpdateState(dispatch);
    const user = GetSessionUser();
    DisconnectFromRoom().
        then(() => DeleteRoom(user['room_id'], user['id'] === 0).
            then(() => UpdateState(dispatch)));
    navigate(`../`, { replace: true });
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