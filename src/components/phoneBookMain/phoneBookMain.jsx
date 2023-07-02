import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import PhoneBookForm from 'components/Phonebook/PhoneBookForm';

function PhoneBookMain() {
  return (
    <>
      <PhoneBookForm />
      <Filter />
      <ContactList />
    </>
  );
}
export default PhoneBookMain;
