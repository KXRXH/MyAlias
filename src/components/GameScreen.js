import {DisconnectButton} from './DisconnectButton';
import {Box, Stack} from '@mui/material';
import {TeamCard} from './TeamCard';
import {NewTeamCard} from './NewTeamCard';
import {useEffect, useState} from 'react';
import {INTERVAL_ROOM} from '../constants/misc';
import {GetRoomData} from '../client/rooms';
import {WarningAlert} from './InfoAlert';
import {useParams} from 'react-router-dom';
import {SpectatorsCard} from './SpectatorsCard';

// Route "/room/RoomID"
export function GameScreen() {
  // TODO: ADD RoomID verification
  const {RoomID} = useParams();
  const [room, setRoomData] = useState({teams: [], user_list: []});
  const [open, setOpen] = useState(false);
  // Updating room every second
  useEffect(() => {
    GetRoomData(RoomID, setRoomData).catch(err => console.warn(err)); // updating before waiting first second
    const interval = setInterval(() => {
      GetRoomData(RoomID, setRoomData).catch(err => console.warn(err));
    }, INTERVAL_ROOM);
    return () => clearInterval(interval);
  }, [RoomID, setRoomData]);

  return (
      <Box>
        <WarningAlert open={open} setOpen={setOpen}/>
        <DisconnectButton/>
        <Box sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Stack direction="row" spacing={2}>
            {room['teams'] ? room['teams'].map(team => {
              return <TeamCard key={team['id']} TeamNumber={team['id']}
                               Users={team['user_list']}/>;
            }) : null}
            <NewTeamCard
                SetOpen={setOpen}
                ModerationIsAllowed={true}
                RoomID={RoomID}
                NewTeamID={room['teams'].length + 1}
                Callback={(newTeams) => {
                  const newRoom = room;
                  newRoom['teams'] = newTeams;
                  setRoomData(newRoom);
                }}/>
          </Stack>
        </Box>
        <Box sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <SpectatorsCard TeamNumber={0} Users={room['user_list']}/>
        </Box>
      </Box>
  );
}