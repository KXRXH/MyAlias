import {DisconnectButton} from './DisconnectButton';
import {Box, Stack} from '@mui/material';
import {TeamCard} from './TeamCard';
import {NewTeamCard} from './NewTeamCard';

export function GameScreen() {
  return (
      <Box>
        <DisconnectButton/>
        <Box sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Stack direction="row" spacing={2}>
            <TeamCard TeamNumber={1} Users={[1, 2, 3, 4, 5]}/>
            <TeamCard TeamNumber={2} Users={[6, 7, 8]}/>
            <TeamCard TeamNumber={3} User={[9, 10, 11, 12]}/>
            <TeamCard TeamNumber={4} Users={[13]}/>
            <NewTeamCard />
          </Stack>
        </Box>
        <Box sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <TeamCard TeamNumber={"Spectators"}/>
        </Box>
      </Box>
  );
}