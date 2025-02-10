import { useState } from 'react';

import { addUser } from '../utils/storage';

export const useModal = ({ setUsers, users, toggleModal }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      }
    },
    phone: '',
    company: { 
      companyName: '',
      catchPhrase: '',
      bs: '',
    }
  });

  const [formErrors, setFormErrors] = useState({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidWebsite = (website) => /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(website);

  const onInputChange = (e) => {
    const { name, value } = e.target;
  
    setNewUser((prevUser) => {
      if (name in prevUser.address) {
        return {
          ...prevUser,
          address: { ...prevUser.address, [name]: value },
        };
      }
      if (name === 'companyName') {
        return {
          ...prevUser,
          company: { ...prevUser.company, name: value },
        };
      }

      if (name === 'catchPhrase' || name === 'bs') {
        return {
          ...prevUser,
          company: { ...prevUser.company, [name]: value },
        };
      }

      if (name === "lat" || name === "lng") {
        return {
          ...prevUser,
          address: {
            ...prevUser.address,
            geo: { ...prevUser.address.geo, [name]: value },
          },
        };
      }
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };  

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!newUser.name) errors.name = 'Name is required';
    if (!newUser.username) errors.username = 'Username is required';

    if (newUser.email && !isValidEmail(newUser.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (newUser.website && !isValidWebsite(newUser.website)) {
      errors.website = 'Please enter a valid website address.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const userWithId = { ...newUser, id: newId };

    setUsers((prevUsers) => [...prevUsers, userWithId]);
    addUser(userWithId);

    toggleModal();
  };

  return { newUser, formErrors, onInputChange, onSubmit };
};
