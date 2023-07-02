import React from 'react';

import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Navigation } from './Navigation/Navigation';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import UserMenu from '../pages/UserMenu';
import SignUpPage from '../pages/SignUp';
import PhoneBookContainer from '../pages/PhoneBookContainer';
import LogInPage from '../pages/LogInPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="usermenu" element={<UserMenu />}></Route>
      </Route>

      <Route
        path="contacts"
        element={
          <PrivateRoute>
            <PhoneBookContainer />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="register"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      ></Route>
      <Route
        path="login"
        element={
          <PublicRoute>
            <LogInPage />
          </PublicRoute>
        }
      ></Route>
      <Route
        path="/usermenu"
        element={
          <PrivateRoute>
            <UserMenu />
          </PrivateRoute>
        }
      ></Route>

      {/* <Route
        path="contacts"
        element={
          <PrivateRoute>
            <PhoneBookContainer />
          </PrivateRoute>
        }
      > */}
      {/* <Route
          path="register"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        ></Route>{' '} */}
      {/* <Route
          path="login"
          element={
            <PublicRoute>
              <LogInPage />
            </PublicRoute>
          }
        ></Route> */}
      {/* </Route>
      <Route
        path="/usermenu"
        element={
          <PrivateRoute>
            <UserMenu />
          </PrivateRoute>
        } */}
      {/* /> */}

      <Route path="*" element={<Navigation />} />
    </Routes>
  );
}
