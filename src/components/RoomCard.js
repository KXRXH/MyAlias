import {Card, CardContent, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {ConnectToRoom} from '../client/client';

export function RoomCard({RoomId, RoomName, PlayerNumber}) {
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
          <Button onClick={() => ConnectToRoom(RoomId)} variant="outlined"
                  size="large" color="success" sx={{
            display: 'flex',
            marginRight: 'auto',
            marginTop: '10px',
          }}>Connect</Button>
        </CardContent>
      </Card>
  );
}