import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeContact, changeContactThunk, getContacts } from 'redux/store';

export default function ChangeContact({ id }) {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const state = useSelector(state => state.contacts);

  const chengedContactData = {
    id,
    name: contactName,
    number: contactNumber,
  };

  const dispatch = useDispatch();
  // const id = key;

  // useEffect(() => {
  //   if (id) {
  //     dispatch(changeContactThunk(chengedContactData)).then(() => {
  //       dispatch(getContacts());
  //     });
  //   }
  // }, [dispatch, id, chengedContactData]);

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

    // console.log('in chenge contact', id, chengedContactData);

    dispatch(changeContactThunk(chengedContactData)).then(() => {
      dispatch(getContacts());
      clearForm();
    });
  };
  return (
    <div>
      <h3>Chenge contact</h3>
      <form action="" onSubmit={handlerSubmit}>
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
            onChange={handlerChenge}
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
            onChange={handlerChenge}
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
