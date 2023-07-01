import { instance } from 'components/api/auth';

export const fetchContacts = async () => {
  const { data } = await instance.get('/contacts');

  return data;
};

export const addContact = async contactData => {
  const addcontactToDB = await instance.post('/contacts', {
    ...contactData,
  });

  return addcontactToDB;
};

export const deleteContact = async id => {
  const deleteContactFromDB = await instance.delete(`/contacts/${id}`);

  return deleteContactFromDB;
};

export const changeContact = async body => {
  const { data } = await instance.patch(`/contacts/${body.id}`, {
    name: body.name,
    number: body.number,
  });
  // console.log('changeContact', data);

  return data;
};
