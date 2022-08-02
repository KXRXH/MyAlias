import Button from '@mui/material/Button';
import {ConnectToRoom, DisconnectFromRoom} from '../client/client';
import {useDispatch} from 'react-redux';
import {UpdateState} from '../utils/utils';

export function DisconnectButton() {
  const dispatch = useDispatch();
  const handleClickDisconnect = () => {
    DisconnectFromRoom().then(() => UpdateState(dispatch));
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