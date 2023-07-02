import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import PhoneBookForm from '../components/Phonebook/PhoneBookForm';

export default function PhoneBookContainer() {
  return (
    <>
      <PhoneBookForm />
      <Filter />
      <ContactList />
    </>
  );
}
