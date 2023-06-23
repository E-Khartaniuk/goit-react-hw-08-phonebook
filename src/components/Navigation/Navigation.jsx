import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function Navigation() {
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
          <li>
            <NavLink to="/login">Lodin</NavLink>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
