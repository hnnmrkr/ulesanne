const STORAGE_KEY = "users";

export const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const initializeUsers = (mockUsers) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveUsers(mockUsers);
  }
};

export const addUser = (user) => {
  const currentUsers = getUsersFromLocalStorage();
  currentUsers.push(user);
  saveUsers(currentUsers);
};
