let lastId = 0;
let $user;
let $password;
let users = [];
const $tbody = document.querySelector(".tbody");

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("dataUsers") !== null) {
    users = JSON.parse(localStorage.getItem("dataUsers"));
    lastId = users.length > 0 ? users[users.length - 1].id : 0;
    Read();
  }
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  Create();
  document.getElementById("form").reset();
});

function Create() {
  $user = document.getElementById("user").value;
  $password = document.getElementById("password").value;

  lastId++;
  users.push({
    id: lastId,
    user: $user,
    password: $password,
  });
  localStorage.setItem("dataUsers", JSON.stringify(users));
  Read();
}

function Delete(id) {
  users = users.filter((e) => e.id !== id);
  localStorage.setItem("dataUsers", JSON.stringify(users));
  Read();
}

function Edit(id) {
  const $inputId = document.getElementById("id");
  const $inputUser = document.getElementById("user");
  const $inputPassword = document.getElementById("password");
  const $btnSend = document.getElementById("send");
  const $btnEdit = document.getElementById("editForm");
  const $btnCancel = document.getElementById("deleteForm");
  $btnSend.classList.add("d-none");
  $btnEdit.classList.remove("d-none");
  $btnCancel.classList.remove("d-none");

  users = JSON.parse(localStorage.getItem("dataUsers"));
  let itemEdit = users.find((e) => e.id === id);

  $inputId.value = itemEdit.id;
  $inputUser.value = itemEdit.user;
  $inputPassword.value = itemEdit.password;
  $tbody.innerHTML = "";

  users.forEach((e) => {
    if (e.id === itemEdit.id) {
      $tbody.innerHTML += `
      <tr class="text-center" id="tr">
        <td class="p-3">${e.user}</td>
        <td class="p-3">${e.password}</td>
        <td>
          <button type="button" class="btn btn-warning edit me-2" id="edit" onclick="Update(${e.id})">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button type="button" class="btn btn-danger delete text-dark " id="delete" onclick="Delete(${e.id})">
            <i class="fas fa-trash-alt text-dark"></i> Delete
          </button>
        </td>
      </tr>
    `;
    } else {
      $tbody.innerHTML += `
      <tr class="text-center" id="tr">
        <td class="p-3">${e.user}</td>
        <td class="p-3">${e.password}</td>
        <td>
          <button type="button" class="btn btn-warning edit me-2" id="edit" onclick="Update(${e.id})" disabled>
            <i class="fas fa-edit"></i> Edit
          </button>
          <button type="button" class="btn btn-danger delete text-dark " id="delete" onclick="Delete(${e.id})" disabled>
            <i class="fas fa-trash-alt text-dark"></i> Delete
          </button>
        </td>
      </tr>
    `;
    }
  });

  // $btnEdit.addEventListener("click", () => {
  //   Update();
  // });

  $btnCancel.addEventListener("click", () => {
    $btnSend.classList.remove("d-none");
    $btnEdit.classList.add("d-none");
    $btnCancel.classList.add("d-none");

    $inputId.value = "";
    $inputUser.value = "";
    $inputPassword.value = "";
    Read();
  });
}

function Update() {
  const $inputId = parseInt(document.getElementById("id").value);
  const $inputUser = document.getElementById("user");
  const $inputPassword = document.getElementById("password");
  const $btnSend = document.getElementById("send");
  const $btnEdit = document.getElementById("editForm");
  const $btnCancel = document.getElementById("deleteForm");

  users = JSON.parse(localStorage.getItem("dataUsers"));
  // debugger;
  users.forEach((e) => {
    if (e.id === $inputId) {
      e.id = $inputId;
      e.user = $inputUser.value;
      e.password = $inputPassword.value;
    }
  });

  $btnSend.classList.remove("d-none");
  $btnEdit.classList.add("d-none");
  $btnCancel.classList.add("d-none");
  localStorage.setItem("dataUsers", JSON.stringify(users));

  $inputId.value = "";
  $inputUser.value = "";
  $inputPassword.value = "";
  Read();
}

function Read() {
  $tbody.innerHTML = "";

  users.forEach((e) => {
    $tbody.innerHTML += `
      <tr class="text-center" id="tr">
        <td class="p-3">${e.user}</td>
        <td class="p-3">${e.password}</td>
        <td>
          <button type="button" class="btn btn-warning edit me-2" id="edit" onclick="Edit(${e.id})">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button type="button" class="btn btn-danger delete text-dark " id="delete" onclick="Delete(${e.id})">
            <i class="fas fa-trash-alt text-dark"></i> Delete
          </button>
        </td>
      </tr>
    `;
  });
}
