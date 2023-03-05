export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

export const getSharedUser = (email) => {
  return getLocalStorageItem("users").find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

export const getSharedUsers = (sharedUsers) => {
  return getLocalStorageItem("users").filter((user) =>
    sharedUsers.includes(user.id)
  );
};
