import { useState } from 'react';
import { addUser } from '../utils/storage';

export const useModal = ({ setUsers, users, toggleModal }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: ''
    },
    phone: '',
    company: { name: '' }
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name in newUser.address) {
      setNewUser((prevUser) => ({
        ...prevUser,
        address: { ...prevUser.address, [name]: value },
      }));
    } 
    else if (name === 'companyName') {
      setNewUser((prevUser) => ({
        ...prevUser,
        company: { ...prevUser.company, name: value },
      }));
    } 
    else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const userWithId = { ...newUser, id: newId };

    setUsers((prevUsers) => [...prevUsers, userWithId]);
    addUser(userWithId);

    toggleModal();
  };

  return { newUser, onInputChange, onSubmit };
};
