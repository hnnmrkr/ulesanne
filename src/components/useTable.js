import { useState, useEffect, useRef } from "react";

import mockData from "../data/mockData.json";
import { getUsersFromLocalStorage, saveUsers } from "../utils/storage";

export const useTable = (searchQuery) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editableRowId, setEditableRowId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tableWrapperRef = useRef(null);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidWebsite = (website) => /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(website);

  useEffect(() => {
    const storedUsers = getUsersFromLocalStorage();
  
    if (!storedUsers || storedUsers.length === 0) {
      saveUsers(mockData);
      setUsers(mockData);
      setFilteredUsers(mockData);
    } else {
      setUsers(storedUsers);
      setFilteredUsers(storedUsers);
    }
  }, []);
  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.username.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const mouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(tableWrapperRef.current.scrollLeft);
  };

  const mouseMove = (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    tableWrapperRef.current.scrollLeft = scrollLeft - moveX;
  };

  const mouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const toggleModal = () => setShowModal(!showModal);

  const deleteUser = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      saveUsers(updatedUsers);
    }
  };
  
  

  const editUser = (userId) => {
    setEditableRowId(userId);
  };

  const saveEdit = (userId, updatedUser) => {
    const { email, website } = updatedUser;
  
    if (email && !isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (website && !isValidWebsite(website)) {
      alert("Please enter a valid website address.");
      return;
    }
  
    const updatedUsers = users.map(user =>
      user.id === userId ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    setEditableRowId(null);
  };
  

  const onInputChange = (e, field, userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        if (field === "lat" || field === "lng") {
          return {
            ...user,
            address: {
              ...user.address,
              geo: {
                ...user.address.geo,
                [field]: e.target.value,
              },
            },
          };
        }
  
        if (field === "company.catchPhrase") {
          return {
            ...user,
            company: {
              ...user.company,
              catchPhrase: e.target.value,
            },
          };
        }

        if (field === "company.bs") {
          return {
            ...user,
            company: {
              ...user.company,
              bs: e.target.value,
            },
          };
        }
  
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
  
    setUsers(updatedUsers);
  };  

  const handleKeyDown = (e, userId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const user = users.find((u) => u.id === userId);
      if (user) {
        saveEdit(userId, user);
      }
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const { street, suite, city, zipcode } = address;
    return [street, suite, city, zipcode].filter(Boolean).join(", ");
  };  

  return {
    users,
    filteredUsers,
    showModal,
    editableRowId,
    tableWrapperRef,
    setUsers,
    mouseDown,
    mouseMove,
    mouseUpOrLeave,
    toggleModal,
    deleteUser,
    editUser,
    saveEdit,
    onInputChange,
    handleKeyDown,
    formatAddress
  };
};
