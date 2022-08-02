import {Card, CardContent, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {CreateNewTeam} from '../client/client';

export function NewTeamCard() {
  return (
      <Card sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CardContent>
          <IconButton size="large" onClick={() => CreateNewTeam()}>
            <AddIcon/>
          </IconButton>
        </CardContent>
      </Card>);
}