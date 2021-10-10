//register
//vartotojas įrašo vardą, emailą ir slaptažodį du kartus (jei nesutampa - front'as nepraleidžia)

const url = "http://localhost:3000/v1/auth/register";
document.getElementById("register").addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  if (password == password2) {
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: e.target.elements[0].value.trim(),
        email: e.target.elements[1].value.trim().toLowerCase(),
        password: e.target.elements[2].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          alert(data.err);
          console.log(data.err);
        } else {
          alert("You have succesfully registered!");
          location.replace("/login.html");
        }
      });
  } else {
    alert("Password does not match!");
  }
});
