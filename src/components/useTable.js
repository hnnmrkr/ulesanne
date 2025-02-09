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

  useEffect(() => {
    const storedUsers = getUsersFromLocalStorage();
    if (storedUsers.length === 0) {
      saveUsers(mockData);
      setUsers(mockData);
    } else {
      setUsers(storedUsers);
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
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const editUser = (userId) => {
    setEditableRowId(userId);
  };

  const saveEdit = (userId, updatedUser) => {
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
        if (field === "company.name") {
          return {
            ...user,
            company: {
              ...user.company,
              name: e.target.value,
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

  return {
    users,
    filteredUsers,
    showModal,
    editableRowId,
    tableWrapperRef,
    mouseDown,
    mouseMove,
    mouseUpOrLeave,
    toggleModal,
    deleteUser,
    editUser,
    saveEdit,
    onInputChange,
    handleKeyDown,
  };
};
