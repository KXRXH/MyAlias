import {Box, Card, CardContent, Typography} from '@mui/material';
import {UserTypography} from './UserTypography';


export function SpectatorsCard({Users}) {
  Users = Users.filter(i => i['team'] === 0); // Getting only spectators from users
  return (
      <Card sx={{maxWidth: 421}}
            onClick={() => console.log('CHANGE TEAM TO ', 0)}>
        <CardContent sx={{minWidth: 175}}>
          <Typography>Spectators</Typography>
          <Box>
            {Users ? Users.map((user, id) => {
              return <UserTypography key={id} UserName={user['nickname']}/>;
            }) : null}
          </Box>
        </CardContent>
      </Card>
  );
}