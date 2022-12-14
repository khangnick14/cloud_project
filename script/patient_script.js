const API =
  "https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsGetAll";

function readPatient(api, name) {
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      //console.log(objectData.Items);
      let arr = objectData[name];
      //sort array of vaccine base on sid
      arr.sort(function (a, b) {
        return parseFloat(a.pid) - parseFloat(b.pid);
      });
      let tableData = "";
      arr.map((value) => {
        tableData += `<tr>
      <td><button class="btn btn-link" onclick='openVaccineTable(${value.pid});'>${value.pid}</button></td>
      <td>${value.name}</td>
      <td>${value.age}</td>
      <td>${value.gender}</td>
      <td>${value.address}</td>
      <td>${value.shot}</td>
       <th>
       <div class='d-flex justify-content-center'>
      <button type='button' onclick='openDeleteForm(${value.pid});' value='${value.sid}'' 
      class='btn btn-danger btn-block m-3' id='deleteBtn'>Delete</button>
      <button type="button" onclick='openUpdateForm(${value.pid});' class="btn btn-secondary btn-md open-update-btn m-3">
        Update
      </button>
      </form>
       </div>
     
      </th>
      </tr>`;
      });
      document.getElementById("body").innerHTML = tableData;
    });
}

readPatient(API, "Items");

const myFormPost = document.querySelector("#project-form-post");
const myFormUpdate = document.querySelector("#project-form-update");

const pid = document.querySelector("#pid");
const shot = document.querySelector("#shot");
const address = document.querySelector("#address");
const patientName = document.querySelector("#name");
const gender = document.querySelector("#gender");
const age = document.querySelector("#age");

const pid_update = document.querySelector("#pid_update");
const shot_update = document.querySelector("#shot_update");
const address_update = document.querySelector("#address_update");
const patientName_update = document.querySelector("#name_update");
const gender_update = document.querySelector("#gender_update");
const age_update = document.querySelector("#age_update");

const openModal = document.querySelector(".open-btn");
const closeModal = document.querySelector(".close-btn");
const modal = document.querySelector("#create-form");

const closeUpdateModal = document.querySelector(".close-update-btn");
const updateModal = document.querySelector("#update-form");

const closeDeleteModal = document.querySelector(".close-delete-btn");
const deleteModal = document.querySelector("#delete-form");
const deleteBtn = document.querySelector("#delete-btn");
let pid_delete = 0;

const closeVaccineTable = document.querySelector(".close-table-btn");
const vaccineTableModal = document.querySelector("#history-vaccine-table");

//query over age form
const queryOverAgeForm = document.querySelector("#over-age-query-form");
const queryOverAgeInput = document.querySelector(".over-age-query-input");

//query under age form
const queryUnderAgeForm = document.querySelector("#under-age-query-form");
const queryUnderAgeInput = document.querySelector(".under-age-query-input");

//query under shot form
const queryUnderShotForm = document.querySelector("#under-shot-query-form");
const queryUnderShotInput = document.querySelector(".under-shot-query-input");

//query patient name form
const queryPatientNameForm = document.querySelector("#patient-name-query-form");
const queryPatientNameInput = document.querySelector(
  ".patient-name-query-input"
);

//query patient id form
const queryPatientIdForm = document.querySelector("#patient-id-query-form");
const queryPatientIdInput = document.querySelector(".patient-id-query-input");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

closeUpdateModal.addEventListener("click", () => {
  updateModal.close();
});

closeDeleteModal.addEventListener("click", () => {
  deleteModal.close();
});

closeVaccineTable.addEventListener("click", () => {
  vaccineTableModal.close();
});

myFormPost.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(pid.value);
  console.log(shot.value);
  console.log(address.value);
  console.log(patientName.value);
  console.log(age.value);
  console.log(gender.value);

  fetch(
    "https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsCreate",
    {
      method: "POST",
      body: JSON.stringify({
        shot: parseInt(shot.value),
        pid: parseInt(pid.value),
        age: parseInt(age.value),
        address: address.value,
        name: patientName.value,
        gender: gender.value,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      age.value = "";
      pid.value = "";
      patientName.value = "";
      shot.value = "";
      gender.value = "";
      address.value = "";
      readPatient(API, "Items");
      modal.close();
    });
});
deleteBtn.addEventListener("click", () => {
  deletePatient(pid_delete);
  deleteModal.close();
});

function deletePatient(id) {
  console.log(id);
  let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsDelete/${id}`;
  console.log(api);
  fetch(api, {
    method: "DELETE",
    body: JSON.stringify({
      pid: parseInt(id),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      readPatient(API, "Items");
    });
}

myFormUpdate.addEventListener("submit", (e) => {
  e.preventDefault();
  let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsUpdate`;
  console.log(api);
  console.log(pid_update.value);
  console.log(shot_update.value);
  console.log(address_update.value);
  console.log(patientName_update.value);
  console.log(age_update.value);
  console.log(gender_update.value);
  updatePatient(
    api,
    pid_update.value,
    shot_update.value,
    address_update.value,
    patientName_update.value,
    gender_update.value,
    age_update.value
  );
});

function openUpdateForm(pid) {
  updateModal.showModal();
  console.log(pid);
  pid_update.value = pid;
}

function updatePatient(api, pid, shot, address, name, gender, age) {
  console.log(api);
  fetch(api, {
    method: "PATCH",
    body: JSON.stringify({
      pid: parseInt(pid),
      shot: parseInt(shot),
      address: address,
      name: name,
      gender: gender,
      age: parseInt(age),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      readPatient(API, "Items");
      updateModal.close();
    });
}

function openDeleteForm(pid) {
  deleteModal.showModal();
  pid_delete = pid;
}

function openVaccineTable(pid) {
  vaccineTableModal.showModal();
  fetchVaccineHistory(pid);
}

function fetchVaccineHistory(pid) {
  let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsQueryPid/${pid}`;
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      console.log(objectData);
      let arr = objectData.shot;
      console.log(arr);
      //sort array of vaccine base on sid
      arr.sort(function (a, b) {
        return parseFloat(a.sid) - parseFloat(b.sid);
      });
      let tableData = "";
      arr.map((value) => {
        tableData += `<tr>
      <td>${value.sid}</td>
      <td>${value.pid}</td>
      <td>${value.vaccine}</td>
      <td>${value.date}</td>
      </tr>`;
      });
      document.getElementById("body-table").innerHTML = tableData;
    });
}

queryOverAgeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const overAge = queryOverAgeInput.value;
  console.log(overAge);
  if (overAge === "") {
    readPatient(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientQueryOverAge/${overAge}`;
    readPatient(api, "patients");
  }
  queryOverAgeInput.value = "";
});

queryUnderAgeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const underAge = queryUnderAgeInput.value;
  console.log(underAge);
  if (underAge === "") {
    readPatient(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsQueryUnderAge/${underAge}`;
    readPatient(api, "patients");
  }
  queryUnderAgeInput.value = "";
});

queryUnderShotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const underShot = queryUnderShotInput.value;
  console.log(underShot);
  if (underShot === "") {
    readPatient(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsQueryUnderShot/${underShot}`;
    readPatient(api, "patient");
  }
  queryUnderShotInput.value = "";
});

queryPatientNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const patientName = queryPatientNameInput.value;
  console.log(patientName);
  if (patientName === "") {
    readPatient(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsQueryName/${patientName}`;
    readPatient(api, "patients");
  }
  queryPatientNameInput.value = "";
});

function getById(api, name) {
  switch (name) {
    case "patients":
      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((objectData) => {
          console.log(objectData);
          let item = objectData.Item;
          if (
            Object.keys(objectData).length === 0 &&
            objectData.constructor === Object
          ) {
            document.getElementById("body").innerHTML = "";
            return;
          }
          let tableData = "";
          tableData += `<tr>
          <td>${item.pid}</td>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.gender}</td>
      <td>${item.address}</td>
      <td>${item.shot}</td>
       <th>
       <div class='d-flex justify-content-center'>
      <button type='button' onclick='openDeleteForm(${item.pid});' value='${item.sid}'' 
      class='btn btn-danger btn-block m-3' id='deleteBtn'>Delete</button>
      <button type="button" onclick='openUpdateForm(${item.pid});' class="btn btn-secondary btn-md open-update-btn m-3">
        Update
      </button>
      </form>
       </div>
     
      </th>
      </tr>`;
          document.getElementById("body").innerHTML = tableData;
        });
  }
}

queryPatientIdForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const patientId = queryPatientIdInput.value;
  console.log(patientId);
  if (patientId === "") {
    readPatient(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/patientsGetById/${patientId}`;
    getById(api, "patients");
  }
  queryPatientIdInput.value = "";
});
