import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Navigation } from './Navigation/Navigation';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import UserMenu from './UserMenu/UserMenu';
import LogInPage from 'pages/LogInPage';
import SignUpPage from 'pages/SignUp';
import PhoneBookMain from 'pages/PhoneBookMain';
import HomePage from 'pages/HomePage';

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
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LogInPage />
            </PublicRoute>
          }
        />
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
