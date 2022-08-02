import {Typography} from '@mui/material';

export function UserTypography({UserName}) {
  return (
      <Typography
          sx={{display: 'flex', marginRight: 'auto'}}>{UserName}</Typography>
  );
}