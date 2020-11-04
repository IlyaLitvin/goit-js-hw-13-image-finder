import api from "./apiService.js";
import template from "./template/template.hbs";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "./css/style.css";

let btn = document.querySelector(".button");
let input = document.querySelector('[type="text"]');
let ul = document.querySelector(".gallery");
let page = 1;

const addCard = function () {
  api(input.value, page).then((data) => {
    if (data.hits.length > 0) {
      data.hits.forEach((el) => {
        ul.insertAdjacentHTML("beforeend", template(el));
        btn.classList.remove("is-hidden");
      });
    } else {
      ul.innerHTML = "";
      btn.classList.add("is-hidden");
      error("Such images are not found");
    }
  });

  ul.innerHTML = "";
  input.value = null;
};
let a = 100;
const loadMore = function () {
  api(input.value, (page += 1)).then((data) => {
    data.hits.forEach((el) => {
      document.documentElement > a + 100;
      ul.insertAdjacentHTML("beforeend", template(el));
    });
  });
};
btn.addEventListener("click", loadMore);
input.addEventListener("change", addCard);
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 1) {
    loadMore();
    const fun = function () {
      window.scrollBy(0, 850);
    };
    setTimeout(fun, 100);
  }
});
