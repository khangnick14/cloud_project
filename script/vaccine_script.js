const API =
  "https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsGetAll";

function readVaccine(api, name) {
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      //console.log(objectData.Items);
      let arr = objectData[name];
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
       <th>
       <div class='d-flex justify-content-center'>
      <button type='button' onclick='openDeleteForm(${value.sid});' value='${value.sid}'' 
      class='btn btn-danger btn-block m-3' id='deleteBtn'>Delete</button>
      <button type="button" onclick='openUpdateForm(${value.sid});' class="btn btn-secondary btn-md open-update-btn m-3">
        Update
      </button>
       </div>
     
      </th>
      </tr>`;
      });
      document.getElementById("body").innerHTML = tableData;
    });
}

readVaccine(API, "Items");

const myFormPost = document.querySelector("#project-form-post");
const myFormUpdate = document.querySelector("#project-form-update");

const sid = document.querySelector("#sid");
const pid = document.querySelector("#pid");
const vaccine = document.querySelector("#vaccine");
const date = document.querySelector("#date");

const sid_update = document.querySelector("#sid_update");
const pid_update = document.querySelector("#pid_update");
const vaccine_update = document.querySelector("#vaccine_update");
const date_update = document.querySelector("#date_update");

const openModal = document.querySelector(".open-btn");
const closeModal = document.querySelector(".close-btn");
const modal = document.querySelector("#create-form");

const closeUpdateModal = document.querySelector(".close-update-btn");
const updateModal = document.querySelector("#update-form");

const closeDeleteModal = document.querySelector(".close-delete-btn");
const deleteModal = document.querySelector("#delete-form");
const deleteBtn = document.querySelector("#delete-btn");
let sid_delete = 0;
//const updateModal = document.querySelector("#update-form")

//query sid form
const queryPidForm = document.querySelector("#pid-query-form");
const queryPidInput = document.querySelector(".pid-query-input");

//query vaccine name form
const queryVaccineForm = document.querySelector("#vaccine-query-form");
const queryVaccineInput = document.querySelector(".vaccine-query-input");

//query vaccine after date
const queryDateForm = document.querySelector("#date-query-form");
const queryDateInput = document.querySelector(".date-query-input");

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

myFormPost.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(vaccine.value);
  console.log(sid.value);
  console.log(pid.value);
  console.log(date.value);
  fetch(
    "https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsCreate",
    {
      method: "POST",
      body: JSON.stringify({
        sid: parseInt(sid.value),
        pid: parseInt(pid.value),
        vaccine: vaccine.value,
        date: date.value,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      sid.value = "";
      pid.value = "";
      vaccine.value = "";
      date.value = "";
      readVaccine(API, "Items");
      modal.close();
    });
});
deleteBtn.addEventListener("click", () => {
  deleteVaccine(sid_delete);
  deleteModal.close();
});

function deleteVaccine(id) {
  console.log(id);
  let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsDelete/${id}`;
  console.log(api);
  fetch(api, {
    method: "DELETE",
    body: JSON.stringify({
      sid: parseInt(id),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      readVaccine(API, "Items");
    });
}

myFormUpdate.addEventListener("submit", (e) => {
  e.preventDefault();
  let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsUpdate`;
  console.log(api);
  console.log(sid_update.value);
  console.log(pid_update.value);
  console.log(vaccine_update.value);
  console.log(date_update.value);
  updateVaccine(
    api,
    sid_update.value,
    pid_update.value,
    vaccine_update.value,
    date_update.value
  );
});

function openUpdateForm(sid) {
  updateModal.showModal();
  console.log(sid);
  sid_update.value = sid;
}

function updateVaccine(api, sid, pid, vaccine, date) {
  fetch(api, {
    method: "PATCH",
    body: JSON.stringify({
      sid: parseInt(sid),
      pid: parseInt(pid),
      vaccine: vaccine,
      date: date,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      readVaccine(API, "Items");
      updateModal.close();
    });
}

function openDeleteForm(sid) {
  deleteModal.showModal();
  sid_delete = sid;
}

queryPidForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const pid = queryPidInput.value;
  console.log(pid);
  if (pid === "") {
    readVaccine(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsQueryPid/${pid}`;
    readVaccine(api, "shot");
  }
  queryPidInput.value = "";
});

queryVaccineForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const vaccineName = queryVaccineInput.value;
  console.log(vaccineName);
  if (vaccineName === "") {
    readVaccine(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsQueryVaccine/${vaccineName}`;
    readVaccine(api, "patients");
  }
  queryVaccineInput.value = "";
});

queryDateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const shotDate = queryDateInput.value;
  console.log(shotDate);
  if (shotDate === "") {
    readVaccine(API, "Items");
  } else {
    let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsQueryDate/${shotDate}`;
    readVaccine(api, "shot");
  }
  queryDateInput.value = "";
});
