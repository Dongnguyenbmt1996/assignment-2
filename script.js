"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const Calbmibtn = document.getElementById("cal-bmi-btn");

let tableBodyEl = document.getElementById("tbody");

const petArr = getFromStorage("petArr") || [];
const breedArr = getFromStorage("breedArr") || [];

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  // bmi: "?",
  date: new Date(2022, 2, 1),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  // bmi: "?",
  date: new Date(2022, 2, 2),
};

// petArr.push(data1);
// petArr.push(data2);

// Sự kiện chọn vào typeInput
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr.filter((breeds) => breeds.type === "Dog");
  const breedCats = breedArr.filter((breeds) => breeds.type === "Cat");
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breeds) {
      const option = document.createElement("option");
      option.innerHTML = `${breeds.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breeds) {
      const option = document.createElement("option");
      option.innerHTML = `${breeds.breed}`;
      breedInput.appendChild(option);
    });
  }
}
typeInput.addEventListener("click", renderBreed);

// Sự kiện click vào submit
submitBtn.addEventListener("click", function () {
  //1. Lấy dữ liệu từ form input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //2. Kiểm tra dữ liệu
  const validate = validateData(data);
  console.log(validate);
  if (validate) {
    //3. Đưa dữ liệu vào danh sách
    petArr.push(data);
    //4. Hiển thị danh sách thú cưng
    renderTableData(petArr);
    //5. Xoá dữ liệu form input
    clearInput();
    //6. Lưu dữ liệu xuống local storage
    saveToStorage("petArr", petArr);
  }
  // Dữ liệu đúng thực hiện 3,4,5
  // Dữ liệu sai hiện thông báo
});

// Thêm dữ liệu nhập vào
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
				<td>${petArr[i].name}</td>
				<td>${petArr[i].age}</td>
				<td>${petArr[i].type}</td>
				<td>${petArr[i].weight} kg</td>
				<td>${petArr[i].length} cm</td>
				<td>${petArr[i].breed}</td>
				<td>
					<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
				</td>
				<td>
          <i class="bi ${
            petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
				<td>
          <i class="bi ${
            petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
				<td>
          <i class="bi ${
            petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
				<td>
          ${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}
        </td>
				<td>
	        <button 
            class="btn btn-danger" 
            onclick="deletePet('${i}')">Delete
          </button>
        </td>
      `;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

// Xoá bảng nhập dữ liệu
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#00000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Kiểm tra dữ liệu đầu vào
function validateData(data) {
  // Đảm bảo không có trường nào bị thiếu dữ lệu
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Vui lòng nhập trường ID!");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("Vui lòng nhập trường name!");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Vui lòng nhập trường age!");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Vui lòng nhập trường weight!");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Vui lòng nhập trường length!");
    isValidate = false;
  }

  // Kiểm tra ID có phải duy nhất hay không?
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
  }
  // Kiểm tra tuổi từ 1 đến 15
  if (data.gae < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  // Kiểm tra weight từ 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  // Kiểm tra length  từ 1 đến 100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  // Kiểm tra chọn giá trị type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  // Kiểm tra chọn giá trị breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}

// Xoá thú cưng ra khỏi danh sách
function deletePet(petId) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    petArr.splice(petId, 1);
    renderTableData(petArr);
  }
}

// Hiện thị thú cưng khoẻ mạnh
let healthyCheck = true;

healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }

    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// Tính chủ số BMI
// Calbmibtn.addEventListener("click", function () {
//   for (let i = 0; i < petArr.length; i++) {
//     petArr[i].bmi =
//       petArr[i].type === "Dog"
//         ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
//         : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
//   }
//   renderTableData(petArr);
// });
