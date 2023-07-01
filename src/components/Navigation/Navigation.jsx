import { MenuItem, MenuList, Paper } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

import { setToken } from 'components/api/auth';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getProfileThunk, logOutThunk } from 'redux/auth/thunk';

export function Navigation() {
  const { access_token, profile } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (access_token && !profile) {
      setToken(access_token);
      dispatch(getProfileThunk())
        .unwrap()
        .catch(() => {
          dispatch(logOutThunk());
        });
    }
  }, [access_token, profile, dispatch]);

  return (
    <div>
      {' '}
      <Paper sx={{ width: 330 }}>
        <MenuList>
          <MenuItem>
            <HomeOutlinedIcon>
              <SendIcon fontSize="small" />
            </HomeOutlinedIcon>
            <NavLink to="/">Home </NavLink>
          </MenuItem>
          <MenuItem>
            <PhoneForwardedOutlinedIcon>
              <PriorityHighIcon fontSize="small" />
            </PhoneForwardedOutlinedIcon>
            <NavLink to="/contacts">contacts</NavLink>
          </MenuItem>
          {!profile && (
            <MenuItem>
              <AppRegistrationOutlinedIcon>
                <DraftsIcon fontSize="small" />
              </AppRegistrationOutlinedIcon>
              <NavLink to="/register">Registration</NavLink>
            </MenuItem>
          )}
          {!profile && (
            <MenuItem>
              <LoginOutlinedIcon>
                <DraftsIcon fontSize="small" />
              </LoginOutlinedIcon>
              <NavLink to="/login">Login</NavLink>
            </MenuItem>
          )}
          {profile && (
            <MenuItem>
              <PersonOutlineOutlinedIcon>
                <DraftsIcon fontSize="small" />
              </PersonOutlineOutlinedIcon>
              <NavLink to="/usermenu">User Menu</NavLink>
            </MenuItem>
          )}
        </MenuList>
      </Paper>
      {/* <nav>
        <ul>
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          <li>
            <NavLink to="/contacts">contacts</NavLink>
          </li>
          {!profile && (
            <li>
              {' '}
              <NavLink to="/register">Registration</NavLink>
            </li>
          )}
          {!profile && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {profile && (
            <li>
              <NavLink to="/usermenu">User Menu</NavLink>
            </li>
          )}
        </ul>
      </nav> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
