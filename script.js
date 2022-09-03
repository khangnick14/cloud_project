const api =
  "https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsGetAll";

function readVaccine() {
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      //console.log(objectData.Items);
      let arr = objectData.Items;
      let tableData = "";
      arr.map((value) => {
        tableData += `<tr>
      <td>${value.pid}</td>
      <td>${value.sid}</td>
      <td>${value.vaccine}</td>
      <td>${value.date}</td>
       <th>
       <div class='d-flex justify-content-center'>
      <form>
      <button type='button' onclick='deleteVaccine(${value.sid});' value='${value.sid}'' 
      class='btn btn-danger btn-block' id='deleteBtn'>Delete</button>
      </form>
      <button type="button" onclick='openUpdateForm(${value.sid});' class="btn btn-info btn-md open-update-btn">
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

readVaccine();

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

//const updateModal = document.querySelector("#update-form");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

closeUpdateModal.addEventListener("click", () => {
  updateModal.close();
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
      readVaccine();
      modal.close();
    });
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
      readVaccine();
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
  fetch(api, {
    method: "PATCH",
    body: JSON.stringify({
      sid: parseInt(sid_update.value),
      pid: parseInt(pid_update.value),
      vaccine: vaccine_update.value,
      date: date_update.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      readVaccine();
      updateModal.close();
    });
});

function openUpdateForm(sid) {
  updateModal.showModal();
  console.log(sid);
  sid_update.value = sid;
}

function updateVaccine(sid, pid, vaccine, date) {
  console.log(sid);
  let api = `https://dgok582391.execute-api.ap-southeast-1.amazonaws.com/shotsUpdate`;
  console.log(api);
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
      readVaccine();
    });
}
