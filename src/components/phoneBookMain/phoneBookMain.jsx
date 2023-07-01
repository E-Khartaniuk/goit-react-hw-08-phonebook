import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { PhoneBookForm } from 'components/phonebook/PhoneBookForm';

export default function PhoneBookMain() {
  return (
    <>
      <PhoneBookForm />
      <Filter />
      <ContactList />
    </>
  );
}
