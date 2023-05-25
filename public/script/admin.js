const login = document.getElementById("login");

login.addEventListener("sumbit", async (e) => {
  e.preventDefault();
  const respond = await fetch("/admin/login");
  const admin = await respond.json();
  if (admin) {
    console.log(encontado);
  } else {
    alert("Usuario no encontrado");
  }
});
