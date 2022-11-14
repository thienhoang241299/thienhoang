const KEY = "SETTING";
const setting = JSON.parse(getFromStorage(KEY)) || { newPerPage: 5, newsCategory: "" };

const btnSetting = document.getElementById("btn-submit");
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
btnSetting.addEventListener("click", function (e) {
  const data = {
    pageSize: inputPageSize.value,
    category: inputCategory.value,
  };
  if (Number.isInteger(parseFloat(inputPageSize.value))) {
    saveToStorage("SETTING", JSON.stringify(data));
    window.location.href = "../pages/news.html";
  } else {
    alert("Page size must is integer");
  }
});
