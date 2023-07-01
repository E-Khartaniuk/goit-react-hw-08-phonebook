import ContactListItem from 'components/ContactListItem/ContactListItem';
import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { getContacts } from 'redux/store';
import { Box, Typography } from '@mui/material';
import { getContacts } from 'redux/contacts/contactsThunk';

export default function ContactList() {
  // const isAuth = useSelector(state => state.auth.access_token);
  const profile = useSelector(state => state.auth.profile);

  const contacts = useSelector(store => store.contacts.contacts.items);
  const filterValue = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) return;
    dispatch(getContacts());
  }, [dispatch, profile]);

  if (contacts === null) {
    return null;
  }

  return (
    <div className={css.contactList}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Contacts
      </Typography>

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
              <Box
                key={contact.id}
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ContactListItem
                  contact={contact}
                  // key={contact.id}
                ></ContactListItem>
              </Box>
            );
          })}
      </ul>
    </div>
  );
}
