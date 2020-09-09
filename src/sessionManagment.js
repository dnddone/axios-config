const JWT_TOKEN = 'jwt_token';

export const getJWTToken = () => window.localStorage.getItem(JWT_TOKEN);

export const setJWTToken = (token) => {
  window.localStorage.setItem(JWT_TOKEN, token);
};

export const clearJWTToken = () => {
  window.localStorage.removeItem(JWT_TOKEN);
};
