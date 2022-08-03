import {Card, CardContent, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {UpdateState} from '../utils/utils';
import {useDispatch} from 'react-redux';
import {ConnectToRoom} from '../client/user';

export function RoomCard({RoomId, RoomName, PlayerNumber}) {
  const dispatch = useDispatch();
  const handleClickConnect = () => {
    ConnectToRoom(RoomId, 0).then(() => UpdateState(dispatch));
  };
  return (
      <Card sx={{maxWidth: 421}}>
        <CardContent sx={{minWidth: 275}}>
          <Typography variant="h6" sx={{display: 'flex', marginRight: 'auto'}}>
            Room id: {RoomId}</Typography>
          <Typography sx={{
            display: 'flex',
            marginRight: 'auto',
          }}>{RoomName}</Typography>
          <Typography variant="h6" sx={{
            display: 'flex',
            marginRight: 'auto',
          }}>Players: {PlayerNumber}</Typography>
          <Button onClick={handleClickConnect} variant="outlined"
                  size="large" color="success" sx={{
            display: 'flex',
            marginRight: 'auto',
            marginTop: '10px',
          }}>Connect</Button>
        </CardContent>
      </Card>
  );
}