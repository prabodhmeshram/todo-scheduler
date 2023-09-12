function isUserLoggedIn() {
  return Boolean(sessionStorage.getItem("logged-in-user"));
}

export { isUserLoggedIn };
