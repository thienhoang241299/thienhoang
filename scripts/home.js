const userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];
const currentUser = JSON.parse(getFromStorage("CURRENT_USER")) || [];

if (currentUser != []) {
  const checkId = (x) => x.userName === currentUser[0].userName;
  let idUser = userArr.findIndex(checkId);
  document.getElementById("main-content").classList.remove("d-none");
  document.getElementById("welcome-message").textContent = `Welcome ${userArr[idUser].firstName}`;
  document.getElementById("login-modal").classList.add("d-none");
} else {
  window.location.href = "./index.html";
}
const logoutBtn = document.getElementById("btn-logout");
logoutBtn.addEventListener("click", function (e) {
  saveToStorage("CURRENT_USER", "");
  window.location.href = "./index.html";
});
