import {Box, Card, CardContent, Typography} from '@mui/material';
import {UserTypography} from './UserTypography';

export function TeamCard({TeamNumber, Users}) {
  return (
      <Card sx={{maxWidth: 421}}
            onClick={() => console.log('CHANGE TEAM TO ', TeamNumber)}>
        <CardContent sx={{minWidth: 175}}>
          <Typography>Team {TeamNumber}</Typography>
          <Box>
            {Users ? Users.map((user, id) => {
              return <UserTypography key={id} UserName={user['nickname']}/>;
            }) : null}
          </Box>
        </CardContent>
      </Card>
  );
}