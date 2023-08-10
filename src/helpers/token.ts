import { AUTH_TOKEN_KEY_NAME, LoginFormRegex } from '../const';
import { Token } from '../types/token';


export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const validatePassword = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return !!value.match(LoginFormRegex.Password);
};

export const validateEmail = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return !!value.match(LoginFormRegex.Email);
};
