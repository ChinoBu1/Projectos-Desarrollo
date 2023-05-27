const contactForm = document.getElementById("contact");
const newsletterForm = document.getElementById("newsletter");
const toastLiveExample = document.getElementById("liveToast");

const er = new RegExp("[^a-zA-ZÀ-ÿ\u00f1\u00d1\u0020]+");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const match = er.exec(formData.get("name")) || "";
  console.log(match);
  if (er.exec(match)) {
    toastLiveExample.children.item(1).innerHTML =
      "El nombre solo puede contener letras y espacios";
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
    return;
  }
  const resp = await fetch("/api/comment", {
    method: "POST",
    body: formData,
  }).then(async (e) => await e.json());

  if (resp) {
    toastLiveExample.children.item(1).innerHTML = "Enviado comentario";
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    contactForm.reset();
    toastBootstrap.show();
  }
});

newsletterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const rep = await fetch(`/api/newsletter?email=${formData.get("email")}`);
  const email = await rep.json();
  if (email[0]) {
    toastLiveExample.children.item(1).innerHTML =
      "Ya esta registrardo en el Newsletter";
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    contactForm.reset();
    toastBootstrap.show();
    return;
  }
  const resp = await fetch("/api/newsletter", {
    method: "POST",
    body: formData,
  });
  const conf = await resp.json();
  if (conf.affectedRows) {
    toastLiveExample.children.item(1).innerHTML = "Subscrito correctamente";
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    contactForm.reset();
    toastBootstrap.show();
  }
  newsletterForm.reset();
});
