"use strict";
//tạo các biến
const idInput = document.getElementById("input-id");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtnBreed = document.getElementById("submit-btn");
const tableBreed = document.getElementById("tbody");
let breedArr = [];

// Lưu dữ liệu Breed vào LocalStorage
function saveBreedsToLocalStorage(objectBreed) {
  localStorage.setItem("breeds", JSON.stringify(objectBreed));
}

//Viết và gọi hàm renderBreedTable
function renderBreedTable(breedArr) {
  tableBreed.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="col">${i + 1}</th>
    <th scope="col">${breedArr[i].breed}</th>
    <th scope="col">${breedArr[i].type}</th>
    <th scope="col"><button onclick="deleteBreed('${i}')" type="button" class="btn btn-danger">Delete</button></th>`;
    tableBreed.appendChild(row);
  }
}

// THÊM BREED
//Xoá dữ liệu sau khi submit
function clearInputBreed() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
//sự kiện nút submit
submitBtnBreed.addEventListener("click", function () {
  const objectBreed = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  console.log(objectBreed);
  //validate 2 trường không được bỏ trống
  if (objectBreed.breed === "" || objectBreed.type === "Select Type") {
    alert("Vui lòng điền đầy đủ các trường thông tin");
  } else {
    breedArr.push(objectBreed);
    localStorage.setItem("breedArr", JSON.stringify(breedArr));
    saveToStorage("breedArr", breedArr);
    clearInputBreed();
    renderBreedTable(breedArr);
  }
});

//Xoá breed
function deleteBreed(index) {
  if (confirm("Bạn có chắc chắn muốn xoá Breed này?")) {
    breedArr.splice(index, 1);
  }

  // sắp xếp lại mảng sau khi bị xoá
  breedArr.sort(function (a, b) {
    return a.breed.localeCompare(b.breed);
  });

  saveToStorage("breedArr", breedArr);
  localStorage.setItem("breedArr", JSON.stringify(breedArr));
  renderBreedTable(breedArr);
}
// Lấy dữ liệu từ localStorage khi tải trang
const storedBreedArr = JSON.parse(localStorage.getItem("breedArr"));
if (Array.isArray(storedBreedArr)) {
  breedArr = storedBreedArr;
}

// Hiển thị dữ liệu trong bảng
renderBreedTable(breedArr);
/////////////////////////////////
console.log(breedArr);
