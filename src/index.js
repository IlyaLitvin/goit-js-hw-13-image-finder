import apiService from "./apiService.js";
import template from "./template/template.hbs";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as basicLightbox from "basiclightbox";
import "../node_modules/basiclightbox/dist/basicLightbox.min.css";
import "./css/style.css";

let buttonLoadMore = document.querySelector(".button");
let input = document.querySelector('[type="text"]');
let list = document.querySelector(".gallery");
let page = 1;

const newPicture = function () {
  apiService(input.value, page).then((data) => {
    if (data.hits.length > 0) {
      data.hits.forEach((el) => {
        list.insertAdjacentHTML("beforeend", template(el));
        buttonLoadMore.classList.remove("is-hidden");
      });
    } else {
      list.innerHTML = "";
      buttonLoadMore.classList.add("is-hidden");
      error("Sorry, I can't find it");
    }
  });
  list.innerHTML = "";
  input.value = null;
};
let a = 100;
const loadMore = function () {
  apiService(input.value, (page += 1)).then((data) => {
    data.hits.forEach((el) => {
      document.documentElement > a + 100;
      list.insertAdjacentHTML("beforeend", template(el));
    });
  });
};
// buttonLoadMore.addEventListener("click", loadMore);
input.addEventListener("change", newPicture);
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 1) {
    loadMore();
    const scrollFunc = function () {
      window.scrollBy(0, 850);
    };
    setTimeout(scrollFunc, 100);
  }
});

const largePicture = function (e) {
  if (e.target.nodeName === "IMG") {
    const instance = basicLightbox.create(`
      <img src=${e.target.dataset["name"]}>
  `);
    instance.show();
  } else "";
};
list.addEventListener("click", largePicture);
