import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeContactThunk,
  getContactsThunk,
} from 'redux/contacts/contactsThunk';
import { editContact } from 'redux/store';
// import { changeContactThunk, editContact, getContacts } from 'redux/store';

export default function ChangeContact() {
  // const state = useSelector(state => state.contacts);
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
      dispatch(getContactsThunk());
      dispatch(editContact(null));
    });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {' '}
        <label htmlFor="">
          {' '}
          Name
          <input
            type="text"
            name="name"
            // pattern="/^[a-zA-Zа-яА-Я]+(([\' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={contactName}
            onChange={handleChange}
            // className={css.formInput}
          />
        </label>
        <label htmlFor="">
          Number
          <input
            type="tel"
            name="number"
            // pattern="/\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={contactNumber}
            onChange={handleChange}
            // className={css.formInput}
          />
        </label>
        <button
          type="submit"
          // className={css.button}
        >
          Change contact
        </button>
      </form>
    </div>
  );
}
