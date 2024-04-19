export const convertCookie = () => {
  return document.cookie
  .split('; ')
  .reduce((acc, cookieItem) => {
    const [key, value] = cookieItem.split('=');
    return {...acc, [key]: value};
  }, {});
};
