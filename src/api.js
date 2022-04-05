const logoutUnauthorized = () => {
  sessionStorage.removeItem("authenticated");
  window.url.replace("/")
};

export const callApi = (url, options = {}, headers = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cache: "no-cache",
      ...headers,
    },
    credentials: "include",
    ...options,
  };

  return fetch(url, defaultOptions)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      } 
      if (res.status === 401) {
        logoutUnauthorized();
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default callApi;
