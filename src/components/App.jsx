import React, { useEffect } from 'react';

import { PhoneBookForm } from './phonebook/PhoneBookForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './styleMain/styleMaine.module.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import PhoneBookMain from './phoneBookMain/phoneBookMain';
import { Navigation } from './Navigation/Navigation';
import SignUpPage from './signUp/signUp';
import LogInPage from './LogInPage/LogInPage';
import UserMenu from './UserMenu/UserMenu';
import { handleFullfild } from 'redux/auth/slice';
import { useDispatch } from 'react-redux';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route
          path="usermenu"
          element={
            // <PrivateRoute>
            <UserMenu />
            // </PrivateRoute>
          }
        ></Route>
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