import {Card, CardContent, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {CreateNewTeam} from '../client/rooms';

export function NewTeamCard({
  ModerationIsAllowed,
  RoomID,
  NewTeamID,
  Callback,
  SetOpen,
}) {
  const onClickHandler = () => {
    if (NewTeamID > 5 || !ModerationIsAllowed) {
      SetOpen(true);
    } else {
      CreateNewTeam(RoomID, NewTeamID, Callback).catch(err => console.warn(err));
    }
  };
  return (
      <Card sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CardContent>
          <IconButton size="large" onClick={onClickHandler}>
            <AddIcon/>
          </IconButton>
        </CardContent>
      </Card>);
}