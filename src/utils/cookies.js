/*eslint no-useless-escape: "error"*/
export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options
  };

  if (Number.isInteger(options.expires)) {
    const date = new Date();
    date.setTime(date.getTime() + (options.expires * 1000));
    options.expires = date;
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const removeCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1
  });
}