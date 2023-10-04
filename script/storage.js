"use strict";

//Bổ sung Animation cho Sidebar
const navAnimation = document.querySelector("#sidebar");
navAnimation.addEventListener("click", function () {
  this.classList.toggle("active");
});

///Lưu dữ liệu dưới LocalStorage

// //lấy dữ liệu petarr
// if (!getFromStorage("petArr")) {
//   //gắn dữ liệu
//   saveToStorage("petArr");
// }
// const petArr1 = getFromStorage("petArr");

// //Hàm lấy dữ liệu
// function getFromStorage(key) {
//   return JSON.parse(localStorage.getItem(key));
// }
// //Hàm lưu dữ liệu
// function saveToStorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }
//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
