import React from 'react';

import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import { Navigation } from './Navigation/Navigation';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import UserMenu from './UserMenu/UserMenu.jsx';
import SignUpPage from './signUp/SignUp.jsx';
import LogInPage from './LogInPage/LogInPage.jsx';
import PhoneBookMain from './phoneBookMain/PhoneBookMain.jsx';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="usermenu" element={<UserMenu />}></Route>
        <Route
          path="contacts"
          element={
            <PrivateRoute>
              <PhoneBookMain />
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
