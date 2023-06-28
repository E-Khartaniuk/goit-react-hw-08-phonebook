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
        <Route path="register" element={<SignUpPage />}></Route>
        <Route path="login" element={<LogInPage />}></Route>
      </Route>
      <Route path="/usermenu" element={<UserMenu />} />

      <Route path="*" element={<Navigation />} />
    </Routes>
  );
}
