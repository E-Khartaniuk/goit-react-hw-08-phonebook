import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import PhoneBookForm from '../components/Phonebook/PhoneBookForm';

function PhoneBookMain() {
  return (
    <div>
      <PhoneBookForm />
      <Filter />
      <ContactList />
    </div>
  );
}
export default PhoneBookMain;
