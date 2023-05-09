const contactForm = document.getElementById("contact");
const newsletterForm = document.getElementById("newsletter");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const resp = await fetch("/contact/comment", {
    method: "POST",
    body: formData,
  });
  console.log(await resp.json());
  contactForm.reset();
});

newsletterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const resp = await fetch("/contact/newsletter", {
    method: "POST",
    body: formData,
  });
  console.log(await resp.json());
  newsletterForm.reset();
});
