const contenedor = document.getElementById("contenedor-news");
const form = document.getElementById("form-news");

const resp = await fetch(`/api/news${window.location.search}`);
const news = await resp.json();

const params = new URLSearchParams(window.location.search);

for (const [key, value] of params.entries()) {
  switch (key) {
    case "start":
      form.children.start.setAttribute(
        "value",
        new Date(value).toISOString().split("T")[0]
      );
      break;
    case "end":
      form.children.end.setAttribute(
        "value",
        new Date(value).toISOString().split("T")[0]
      );
      break;

    default:
      break;
  }
}

if (news.length < 1) {
  cartel.classList.toggle("hidden");
}

form.children.start.setAttribute("max", new Date().toISOString().split("T")[0]);
form.children.end.setAttribute("max", new Date().toISOString().split("T")[0]);

form.addEventListener("change", (e) => {
  const formData = new FormData(e.currentTarget);

  if (formData.get("start") !== "") {
    const date = new Date(formData.get("start"));
    if (date > new Date(form.children.end.value)) {
      form.children.end.value = form.children.start.value;
    }
    form.children.end.setAttribute("min", date.toISOString().split("T")[0]);
  } else {
    form.children.end.removeAttribute("min");
  }
});

form.addEventListener("sumbit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const urlSearch = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    urlSearch.append(key, value);
  }
  window.location.search = urlSearch;
});

news.forEach((not) => {
  const row = document.createElement("div");
  row.classList.add("row");
  const date = new Date(not.date);
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("new");
  card.innerHTML = `
  <div class="card-body">
    <h5 class="card-title">${not.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${date.toLocaleDateString()}</h6>
    <p class="card-text">${not.text}</p>
  </div>
`;
  row.appendChild(card);
  contenedor.appendChild(row);
});
