import React, { useEffect, useState } from 'react';
// import csstitle from './styleMain/styleMaine.module.css';

import css from './PhoneBookForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postContact } from 'redux/contacts/contactsThunk';
// import { postContact } from 'redux/store';
// import { handleFullfild } from 'redux/auth/slice';
// import { addContactAction } from 'components/actions';
// import { addContact } from 'redux/store';

export function PhoneBookForm() {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const state = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  const handlerChenge = event => {
    const { value } = event.currentTarget;
    event.currentTarget.name === 'name'
      ? setContactName(value)
      : setContactNumber(value);
  };

  const clearForm = () => {
    setContactName('');
    setContactNumber('');
  };

  const handlerSubmit = event => {
    event.preventDefault();
    const unicContactSearch = state.contacts.items.some(
      contact => contact.name === contactName
    );

    if (unicContactSearch) {
      alert(`${contactName} is already in contacts`);
      return;
    }

    dispatch(
      postContact({
        name: contactName,
        number: contactNumber,
      })
    );

    clearForm();
  };

  return (
    <div>
      <h3
      // className={csstitle.title}
      >
        Phone book
      </h3>
      <form
        action=""
        autoComplete="on"
        onSubmit={handlerSubmit}
        className={css.form}
      >
        {' '}
        <label htmlFor="" className={css.formLable}>
          {' '}
          Name
          <input
            type="text"
            name="name"
            // pattern="/^[a-zA-Zа-яА-Я]+(([\' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={contactName}
            onChange={handlerChenge}
            className={css.formInput}
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
            onChange={handlerChenge}
            className={css.formInput}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </div>
  );
}
