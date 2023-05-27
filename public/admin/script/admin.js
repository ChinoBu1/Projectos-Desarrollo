const login = document.getElementById("login");
const toastLiveExample = document.getElementById("liveToast");

login.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const urlSearch = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    urlSearch.append(key, value);
  }
  const respond = await fetch(`admin/login?${urlSearch.toString()}`);
  const admin = await respond.json();
  if (admin.length) {
    window.location.replace("/admin/post");
  } else {
    toastLiveExample.children.item(1).innerHTML = "No Encontado";
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    login.reset();
    toastBootstrap.show();
  }
});
