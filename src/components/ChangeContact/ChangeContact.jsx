import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editContact,
  // getContacts
} from 'redux/store';

import ChangeContactCss from './ChangeContact.module.css';
import { changeContactThunk, getContacts } from 'redux/contacts/contactsThunk';

export default function ChangeContact() {
  const contactForEditing = useSelector(
    state => state.contacts.contacts.editedContact
  );

  const [contactName, setContactName] = useState(contactForEditing?.name ?? '');
  const [contactNumber, setContactNumber] = useState(
    contactForEditing?.number ?? ''
  );

  const chengedContactData = {
    id: contactForEditing.id,
    name: contactName,
    number: contactNumber,
  };

  const dispatch = useDispatch();

  const handleChange = event => {
    const { value } = event.currentTarget;
    event.currentTarget.name === 'name'
      ? setContactName(value)
      : setContactNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(changeContactThunk(chengedContactData)).then(() => {
      dispatch(getContacts());
      dispatch(editContact(null));
    });
  };
  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        className={ChangeContactCss.changeContact}
      >
        {' '}
        <label htmlFor="">
          {' '}
          <TextField
            id="outlined-basic"
            label="New name"
            variant="outlined"
            type="text"
            name="name"
            // pattern="/^[a-zA-Zа-яА-Я]+(([\' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={contactName}
            onChange={handleChange}
            className={ChangeContactCss.formInput}
          />
        </label>
        <label htmlFor="">
          <TextField
            id="outlined-basic"
            label="New number"
            variant="outlined"
            type="tel"
            name="number"
            // pattern="/\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={contactNumber}
            onChange={handleChange}
            className={ChangeContactCss.formInput}
          />
        </label>
        <Button
          variant="outlined"
          type="submit"
          className={ChangeContactCss.changeContactBtn}
        >
          Change contact
        </Button>
      </form>
    </div>
  );
}
