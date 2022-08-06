import {Card, CardContent, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {UpdateState} from '../utils/utils';
import {useDispatch} from 'react-redux';
import {ConnectToRoom} from '../client/user';
import {useNavigate} from 'react-router-dom';

export function RoomCard({RoomID, RoomName, PlayerNumber}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickConnect = () => {
    ConnectToRoom(RoomID, 0).then(() => UpdateState(dispatch));
    navigate(`/room/${RoomID}`, {replace: true});
  };
  return (
      <Card sx={{maxWidth: 421}}>
        <CardContent sx={{minWidth: 275}}>
          <Typography variant="h6" sx={{display: 'flex', marginRight: 'auto'}}>
            Room id: {RoomID}</Typography>
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