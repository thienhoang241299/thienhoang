function parseUser(userData) {
  const user = new User(userData.firstname, userData.lastname, userData.username, userData.password);

  return user;
}
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
  }
}
function isNull(a) {
  let b = false;
  if (!a || a.length == 0) {
    b = true;
  }
  return b;
}
/////////// CHECK_USER_NAME/////////
function check_user(element, arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userName === element) {
      count++;
      break;
    }
  }
  return count > 0 ? true : false;
}
function check_login(userName, passWord, arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userName === userName && arr[i].password === passWord) {
      count++;
      break;
    }
  }
  return count > 0 ? true : false;
}
