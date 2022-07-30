import Button from '@mui/material/Button';
import {DisconnectFromRoom} from '../client/client';

export function DisconnectButton() {
  return (
      <Button onClick={() => DisconnectFromRoom()}
              sx={{
                display: 'flex',
                marginLeft: 'auto',
                marginTop: '10px',
                marginRight: '10px',
              }} color="secondary" variant="outlined">Disconnect
      </Button>
  );
}