import { Button, Stack } from '@mui/material';
import { dellToken } from 'components/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logOutThunk } from 'redux/auth/thunk';

export default function UserMenu() {
  const isAuth = useSelector(store => store.auth.access_token);
  const profile = useSelector(store => store.auth.profile);
  const dispatch = useDispatch();

  const handleLogOut = event => {
    event.preventDefault();
    console.log('exit');
    dispatch(logOutThunk());
    dellToken();
  };
  return (
    isAuth && (
      <div>
        <p>{profile.name}</p>
        <Stack spacing={2} direction="row" onClick={handleLogOut}>
          <Button variant="contained" type="button">
            Logout
          </Button>
        </Stack>
      </div>
    )
  );
}
