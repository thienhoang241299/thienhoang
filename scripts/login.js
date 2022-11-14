const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = [];
const submitBtn = document.getElementById("btn-submit");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
submitBtn.addEventListener("click", function (e) {
  const data = {
    userName: usernameInput.value,
    password: passwordInput.value,
  };
  let checkValidate = validatieForm(data.userName, data.password);
  if (checkValidate) {
    currentUser.length = 0;
    saveToStorage("CURRENT_USER", "");
    currentUser.push(data);
    saveToStorage("CURRENT_USER", JSON.stringify(currentUser));
    window.location.href = "../index.html";
  }
});

////////// VALIDATE  ///////////
function validatieForm(username, password) {
  if (isNull(username) || isNull(password)) {
    alert(`you must enter field requir`);
    return false;
  }
  if (check_login(username, password, userArr)) {
    alert("Login Success");
    return true;
  } else {
    alert("username or password is not correct");
  }
}
