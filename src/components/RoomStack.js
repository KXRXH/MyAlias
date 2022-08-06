import {Box, Stack} from '@mui/material';
import {RoomCard} from './RoomCard';

export function RoomStack({rooms}) {
  return (
      <Box sx={{
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Stack spacing={2}>
          {rooms ? rooms.map(obj => {
            return <RoomCard key={obj['room_id']} RoomID={obj['room_id']}
                             PlayerNumber={obj['user_list'].length}/>;
          }) : null}
        </Stack>
      </Box>
  );
}