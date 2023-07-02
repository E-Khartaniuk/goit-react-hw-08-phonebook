import React from 'react';

import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import { Navigation } from './Navigation/Navigation';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import UserMenu from './UserMenu/UserMenu';
import LogInPage from './LogInPage/LogInPage';
// import PhoneBookMain from './PhoneBookMain/PhoneBookMain';
import SignUpPage from './SignUp/SignUp';
import PhoneBookContainer from './PhoneBookContainer/PhoneBookContainer';

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
      >
        <Route
          path="register"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        ></Route>{' '}
        <Route
          path="login"
          element={
            <PublicRoute>
              <LogInPage />
            </PublicRoute>
          }
        ></Route>
      </Route>
      <Route
        path="/usermenu"
        element={
          <PrivateRoute>
            <UserMenu />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigation />} />
    </Routes>
  );
}
