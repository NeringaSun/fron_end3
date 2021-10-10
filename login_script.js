//login
//vartotojas įrašo emailą, slaptažodį; gauna token; nukreipia į groups pasirinkimą.
const url = "http://localhost:3000/v1/auth/login";
document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: e.target.elements[0].value.trim().toLowerCase(),
      password: e.target.elements[1].value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        alert(data.err);
      } else {
        localStorage.setItem("token", data.token);
        location.replace("/groups.html");
      }
    });
});
