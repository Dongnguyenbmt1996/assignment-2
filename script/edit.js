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

const petArrEdit = getFromStorage("petArr") || [];
const containerForm = document.getElementById("container-form");

let tableBodyEl = document.getElementById("tbody");

///////////////////////////////
//Hien thi danh sach thu cung
const renderPetEdit = function (petArr) {
  document.getElementById("tbody").innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    //Tạo 1 element ở trong table
    let row = document.createElement("tr");
    //Lưu ý việc sử dụng onclick ở đây là 1 global scope
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
        }"></i></td>
      <td>
        ${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}
      </td>
      <td>
        <button 
          type="button" 
          class="btn btn-warning" 
          onclick="editPet('${petArr[i].id}')">Edit
        </button>
      </td>
    `;
    //Trỏ đến vị trí id="tbody"
    document.getElementById(`tbody`).appendChild(row);
  }
};

renderPetEdit(petArrEdit);

//////////////////////////
////////////////////////////////////////////////////////////////-INSIDE
// bat su kien click edit
let selectPet = 0;

const editPet = function (petId) {
  //tim phan tu cua mang chua petId can edit
  selectPet = petArrEdit.filter((value) => {
    return value.petId === petId;
  });
  //Hien thi edit form
  containerForm.classList.remove("hide");
  showFormEdit(selectPet);
};

submitBtn.addEventListener("click", function (e) {
  console.log(selectPet);
  e.preventDefault();
  editFormEdit(selectPet);
  renderPetEdit(petArrEdit);
  saveToStorage("petArr", JSON.stringify(petArrEdit));

  // //an form edit
  initialFormPet();
  containerForm.classList.add("hide");
});

// tao ham hien thi form
const editFormEdit = function (petArrEdit) {
  petArrEdit[0].id = formInputId.value;
  petArrEdit[0].name = formInputName.value;
  petArrEdit[0].age = formInputAge.value;
  petArrEdit[0].type = formInputType.value;
  petArrEdit[0].weight = formInputWeight.value;
  petArrEdit[0].length = formInputLength.value;
  petArrEdit[0].color = formInputColor.value;
  petArrEdit[0].breed = formInputBreed.value;
  petArrEdit[0].vaccinated = formInputVaccinated.checked;
  petArrEdit[0].dewormed = formInputDewormed.checked;
  petArrEdit[0].sterilized = formInputSterilized.checked;
};

// tao ham hien thi form theo petId
const showFormEdit = function (petInfoArrEdit) {
  formInputId.value = petInfoArrEdit[0].id;
  formInputName.value = petInfoArrEdit[0].name;
  formInputAge.value = petInfoArrEdit[0].age;
  formInputType.value = petInfoArrEdit[0].type;
  formInputWeight.value = petInfoArrEdit[0].weight;
  formInputLength.value = petInfoArrEdit[0].length;
  formInputColor.value = petInfoArrEdit[0].color;
  // formInputBreed.value = `why`;
  formInputVaccinated.checked = petInfoArrEdit[0].vaccinated;
  formInputDewormed.checked = petInfoArrEdit[0].dewormed;
  formInputSterilized.checked = petInfoArrEdit[0].sterilized;
  ////////////////////
};
