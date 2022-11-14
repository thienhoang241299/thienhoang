const btnSearch = document.getElementById("btn-submit");
const inputSearch = document.getElementById("input-query");
//// get key word to search
btnSearch.addEventListener("click", function (e) {
  keyWord = inputSearch.value;
  if (keyWord != "") {
    url = updateUrl();
    renderPaginationBar();
  } else {
    alert("vui long nhap tu khoa tim kiem");
  }
});
