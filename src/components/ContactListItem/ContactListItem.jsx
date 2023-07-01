import React from 'react';
import css from './ContactListItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContactThunk, editContact } from 'redux/store';
import ChangeContact from 'components/ChangeContact/ChangeContact';
import { deleteContactThunk } from 'redux/contacts/contactsThunk';
import { editContact } from 'redux/store';

export default function ContactListItem({ contact }) {
  const dispatch = useDispatch();
  const contactForEditing = useSelector(
    state => state.contacts.contacts.editedContact
  );

  const hendlerDeleteContact = () => {
    dispatch(deleteContactThunk(contact.id));
  };

  const hendlerEditContact = () => {
    if (contactForEditing) {
      dispatch(editContact(null));
      return;
    }
    dispatch(editContact(contact));
  };

  const name = contact.name;
  const number = contact.number;

  return (
    <li className={css.listItem}>
      {contactForEditing?.id === contact?.id ? (
        <div>
          <ChangeContact key={contact.id}></ChangeContact>
        </div>
      ) : (
        <div>
          {name}: {number}
        </div>
      )}

      <button onClick={hendlerDeleteContact} className={css.button}>
        Delete
      </button>
      <button onClick={hendlerEditContact} className={css.button}>
        {contactForEditing?.id === contact?.id ? 'close' : 'Edit'}
      </button>
    </li>
  );
}
