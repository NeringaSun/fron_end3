//mato sąskaitas specifinės grupės ir gali naujas pridėt.
//first section of page loads info about bills

const url = "http://localhost:3000/v1/bills";
const groupId = location.search?.slice(4);
const table = document.querySelector("tbody");

const token = localStorage.getItem("token");
if (token) {
  fetch(`${url}/${groupId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        alert("no bills yet! Add new one!");
      } else {
        dataDisplay(data);
      }
    })
    .catch((err) => {
      alert("Unexpected error, please try again!");
    });
} else {
  alert("not authed");
  location.replace("login.html");
}

table.innerHTML = "";
function dataDisplay(data) {
  data.forEach((e) => {
    const tr = table.insertRow();
    const td1 = tr.insertCell();
    td1.textContent = e.id;
    const td2 = tr.insertCell();
    td2.textContent = e.description;
    const td3 = tr.insertCell();
    td3.textContent = `$${e.amount}`;
  });
}

//register new bill
//front'as paduoda: group_id, amount, description

document.getElementById("new_bill").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      group_id: groupId,
      amount: e.target.elements[0].value.trim(),
      description: e.target[1].value.trim(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        alert(data.err);
      } else {
        alert("Bill has been successfully added!");
        location.reload(true);
      }
    });
});
