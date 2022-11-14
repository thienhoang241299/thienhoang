const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const submitBtn = document.getElementById("btn-submit");
const firstnameInput = document.getElementById("input-firstname");
const lastnameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordCheckInput = document.getElementById("input-password-confirm");

submitBtn.addEventListener("click", function (e) {
  const data = {
    firstName: firstnameInput.value,
    lastName: lastnameInput.value,
    userName: usernameInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordCheckInput.value,
  };
  let checkValidate = validatieForm(data.firstName, data.lastName, data.userName, data.password, data.passwordConfirm);
  if (checkValidate) {
    userArr.push(data);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
});

////////// VALIDATE  ///////////
function validatieForm(firstName, lastName, username, password, passwordConfirm) {
  if (isNull(firstName) || isNull(lastName) || isNull(username) || isNull(password) || isNull(passwordConfirm)) {
    alert(`you must enter field requir`);
    return false;
  }
  if (check_user(username, userArr)) {
    alert("User Name must unique!");
    return false;
  }
  if (password.length < 8) {
    alert("Mat khau phai co hon 8 ky tu");
    return false;
  }
  if (password != passwordConfirm) {
    alert(`Password and Password confirm must match`);
    return false;
  }

  return true;
}
///// *** ////
