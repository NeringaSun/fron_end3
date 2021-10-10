//vartotojas mato visas savo grupes (pagal accounts lentelę iš DB). Paspaudus - nuveda į tos grupės bills. Apačioje forma pridėti grupę prie paskyros (t.y. į accounts lentelę).
//first section of page loads info about groups

const url_accounts = "http://localhost:3000/v1/accounts";
const url_groups = "http://localhost:3000/v1/groups";
const token = localStorage.getItem("token");

if (token) {
  fetch(`${url_accounts}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0].id == null) {
        alert("no groups yet! Add new one!");
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
function dataDisplay(data) {
  data.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("group_card");

    card.addEventListener("click", () => {
      location.replace(`bills.html?id=${e.id}`);
    });

    const groupId = document.createElement("div");
    const groupName = document.createElement("div");

    groupId.textContent = `ID: ${e.id}`;
    groupName.textContent = e.name;

    card.append(groupId, groupName);
    document.getElementById("group_list").append(card);
  });
}

// when new group created:
// 1) fetch: post group in DB, returns group ID
// 2) another fetch post record in accounts using group ID from previous fetch and user ID from token

document.getElementById("new_group").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url_groups}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name: e.target.elements[0].value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        alert(data.err);
      } else {
        const returned_group_id = data.insertId;
        const user_id = JSON.parse(atob(token.split(".")[1])).id;
        fetch(url_accounts, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            group_id: returned_group_id,
            user_id: user_id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.err) {
              alert(data.err);
            } else {
              alert("Group has been created successfully!");
              location.reload(true);
            }
          });
      }
    });
});
document.getElementById("log_out_go_back").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("login.html");
});
