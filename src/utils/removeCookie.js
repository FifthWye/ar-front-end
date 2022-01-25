export const removeCookie = (name) => {
  document.cookie = name + '=; Max-Age=0';
};
