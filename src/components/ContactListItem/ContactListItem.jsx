import React from 'react';
import css from './ContactListItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'redux/store';
import ChangeContact from 'components/ChangeContact/ChangeContact';

export default function ContactListItem({ contact }) {
  const dispatch = useDispatch();

  const hendlerDeleteContact = () => {
    dispatch(deleteContactThunk(contact.id));
  };

  const name = contact.name;
  const number = contact.number;

  return (
    <li className={css.listItem}>
      {name}: {number}
      <div>
        <ChangeContact key={contact.id} id={contact.id}></ChangeContact>
      </div>
      <button onClick={hendlerDeleteContact} className={css.button}>
        Delete
      </button>
    </li>
  );
}
