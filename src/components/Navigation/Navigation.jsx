import { setToken } from 'components/api/auth';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getProfileThunk } from 'redux/auth/thunk';

export function Navigation() {
  const { access_token, profile } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (access_token && !profile) {
      setToken(access_token);
      dispatch(getProfileThunk());
    }
  }, [access_token, profile, dispatch]);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          <li>
            <NavLink to="/contacts">contacts</NavLink>
          </li>
          <li>
            <NavLink to="/register">Registration</NavLink>
          </li>
          {/* {!isAuth && ( */}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          {/* )} */}
          <li>
            <NavLink to="/usermenu">User Menu</NavLink>
          </li>
          {/* <li>
            <NavLink to="/UserMenu">Lodin</NavLink>
          </li> */}
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
