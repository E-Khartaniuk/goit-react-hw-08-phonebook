import React from 'react';
import css from './ContactListItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'redux/store';

export default function ContactListItem({ contact }) {
  const dispatch = useDispatch();

  const hendlerDeleteContact = () => {
    dispatch(deleteContactThunk(contact.id));
  };

  const name = contact.name;
  const phone = contact.phone;

  return (
    <li className={css.listItem}>
      {name}: {phone}{' '}
      <button onClick={hendlerDeleteContact} className={css.button}>
        Delete
      </button>
    </li>
  );
}
