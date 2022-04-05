export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => localStorage.getItem(key);

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
