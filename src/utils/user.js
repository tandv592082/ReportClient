export const userKey = 'user';

export function getUserLocal() {
  return localStorage.getItem(userKey);
}

export function resetUserLocal() {
  return localStorage.removeItem(userKey);
}

export function setUserLocal(user) {
  return localStorage.setItem(userKey, user);
}

export function isUserLoggedIn() {
  return !!getUserLocal();
}
