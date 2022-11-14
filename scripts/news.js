let currentPage = 1;
const settings = JSON.parse(getFromStorage("SETTING")) || { newPerPage: 5, newsCategory: "" };
let category = settings.category;
let pageSize = parseInt(settings.pageSize);
let totalResult = pageSize * 10;
let datecurrent = Date.now();
let date = new Date(datecurrent);
let keyWord = "";
const apiKey = "2429b52fd43945eab30515dd92883772";
var url = updateUrl();

const news = document.getElementById("news-container");
const btnNext = document.getElementById("btn-next");
const liPrev = document.getElementById("li-prev");
const liNext = document.getElementById("li-next");
/////////////// get number news
var numberNews;
const btnPrev = document.getElementById("btn-prev");
const paginationBar = document.getElementById("pagination-bar");
renderPaginationBar();
//////// get pagination
async function renderPaginationBar() {
  let req = new Request(url);
  await fetch(req)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      numberNews = data.totalResults;
      numberNews > pageSize * 10 ? (numberNews = pageSize * 10) : (numberNews = numberNews);
      if (data.status == "ok") {
        renderPagination();
      } else {
        let textPagi = document.createElement("h3");
        textPagi.innerHTML = `${data.message}`;
        paginationBar.appendChild(textPagi);
      }
    });
}
/// change page ///
function changePage(a) {
  let oldPage = currentPage;

  currentPage = parseInt(a);
  document.getElementById(`page-num-${a}`).classList.add(`bg-primary`, `text-dark`);
  document.getElementById(`page-num-${oldPage}`).classList.remove(`bg-primary`, `text-dark`);

  currentPage != 1 ? document.getElementById("li-prev").classList.remove("disabled") : document.getElementById("li-prev").classList.add("disabled");
  currentPage != 10 ? document.getElementById("li-next").classList.remove("disabled") : document.getElementById("li-next").classList.add("disabled");

  var url = updateUrl();
  getAPI(url);
}
function nextPage() {
  changePage(currentPage + 1);
}
function prevPage() {
  changePage(currentPage - 1);
}
///////// render data from api
async function getAPI(url) {
  let req = new Request(url);
  await fetch(req)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      renderData(data);
    });
}
function renderData(data) {
  news.innerHTML = "";
  data.articles.forEach((article) => {
    const newDetail = document.createElement("div");
    newDetail.innerHTML = `<div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${article.urlToImage}"
									class="card-img"
									alt="${article.title}">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.content}</p>
									<a href="${article.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`;
    news.appendChild(newDetail);
  });
}

function renderPagination() {
  if (numberNews > 0) {
    let nextbtn = document.createElement("li");
    nextbtn.innerHTML = `<li class="page-item  disabled" id="li-prev">
              <button class="page-link " href="#" id="btn-prev" onclick="prevPage()">Previous</button>
            </li>`;
    paginationBar.appendChild(nextbtn);
    let numberPage = numberNews / pageSize;
    numberPage < 1 ? (numberPage = 1) : (numberPage = numberPage);
    for (let i = 1; i <= numberPage; i++) {
      let textPagi = document.createElement("li");
      textPagi.innerHTML = `<li class="page-item" id="page-${i}">
              <a class="page-link" id="page-num-${i}" onclick="changePage(${i})">${i}</a>
            </li>`;
      paginationBar.appendChild(textPagi);
    }

    let prevbtn = document.createElement("li");
    prevbtn.innerHTML = `<li class="page-item" id="li-next">
              <button class="page-link" href="#" id="btn-next" onclick="nextPage()">Next</button>
            </li>`;
    document.getElementById(`page-num-${currentPage}`).classList.add(`bg-primary`, `text-dark`);
    paginationBar.appendChild(prevbtn);
    getAPI(url);
  } else {
    let textPagi = document.createElement("h3");
    textPagi.innerHTML = "Khong co Result phu hop";
    paginationBar.appendChild(textPagi);
  }
}
function updateUrl() {
  url =
    "https://newsapi.org/v2/top-headlines?" +
    `q=${keyWord}&` +
    `category=${category}&` +
    `country=us&` +
    `page=${currentPage}&` +
    `pageSize=${pageSize}&` +
    `totalResults=${totalResult}&` +
    `apiKey=${apiKey}`;
  return url;
}
