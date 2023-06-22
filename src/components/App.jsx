import React from 'react';

import { PhoneBookForm } from './phonebook/PhoneBookForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './styleMain/styleMaine.module.css';

export function App() {
  return (
    <div className={css.conteiner}>
      <h3 className={css.title}>Phone book</h3>
      <PhoneBookForm />
      <h4 className={css.titleSecond}>Find Contact</h4>
      <Filter />
      <h4 className={css.titleSecond}>Contacts</h4>
      <ContactList />{' '}
    </div>
  );
}
