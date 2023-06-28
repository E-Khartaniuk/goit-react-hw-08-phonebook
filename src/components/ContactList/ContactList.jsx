import ContactListItem from 'components/ContactListItem/ContactListItem';
import React, { useEffect } from 'react';
import css from './ContactList.module.css';
// import csstitle from './styleMain/styleMaine.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/store';

export default function ContactList() {
  const isAuth = useSelector(state => state.auth.access_token);

  const contacts = useSelector(store => store.contacts.contacts.items);
  const filterValue = useSelector(state => state.contacts.filter);
  // console.log('all contacts from state', contacts);
  // console.log('filterValue from state', filterValue);

  const dispatch = useDispatch();

  useEffect(() => {
    isAuth && dispatch(getContacts());
  }, [dispatch, isAuth]);

  if (contacts === null) {
    return null;
  }

  return (
    <div className="contactList">
      <h4
      // className={csstitle.titleSecond}
      >
        Contacts
      </h4>
      <ul className={css.contactList}>
        {contacts
          .filter(contact => {
            // console.log('contact in contact list', contact);
            const filteredContacts = contact.name
              .toLowerCase()
              .includes(filterValue);

            return filteredContacts;
          })
          .map(contact => {
            return (
              <ContactListItem
                contact={contact}
                key={contact.id}
              ></ContactListItem>
            );
          })}
      </ul>
    </div>
  );
}
