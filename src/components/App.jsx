import React from 'react';

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

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="contacts" element={<PhoneBookMain />}></Route>
        <Route path="register" element={<SignUpPage />}></Route>
        <Route path="login" element={<LogInPage />}></Route>
      </Route>
      <Route path="*" element={<Navigation />} />
    </Routes>
  );
}
