export function validateEmail(value) {
  const emailRegex = new RegExp(
    "^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$"
  );
  if (!value.match(emailRegex)) {
    return "Please enter a valid email!";
  }
  return undefined;
}

export function isEmpty(value) {
  if (!!value.trim()) return undefined;
  return "Required";
}

export function validatePassword(value) {
  const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-])[0-9a-zA-Z!@#$%^&*-]{8,}$/g
  );
  if (!value.match(passwordRegex)) {
    return "Password must have \n minimum eight characters, \n at least one uppercase letter, \n one lowercase letter, \n one number and one special character";
  }

  return undefined;
}
