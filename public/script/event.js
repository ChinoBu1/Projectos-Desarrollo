const contenedor = document.getElementById("container-event");
const cartel = document.getElementById("cartel");
const placeSelect = document.getElementById("place");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.getAll(prop),
});

const resp2 = await fetch("/api/event/place");
const places = await resp2.json();

const optionAll = document.createElement("option");
optionAll.value = "all";
optionAll.innerHTML = "Todos";
placeSelect.appendChild(optionAll);

places.forEach((place) => {
  const option = document.createElement("option");
  option.value = place.place;
  option.innerHTML = place.place;
  placeSelect.appendChild(option);
});

const checkboxes = document.querySelectorAll("input[type=checkbox]");
placeSelect.value = params.place !== null ? params.place : "all";

checkboxes.forEach((checkbox) => {
  checkbox.checked = params.moment.includes(checkbox.value);
  if (checkbox.id === "past") {
    checkbox.checked = params.past.length;
  }
});

const resp = await fetch(`/api/event${window.location.search}`);
const events = await resp.json();

if (events.length < 1) {
  cartel.classList.toggle("hidden");
}

events.forEach((event) => {
  const row = document.createElement("div");
  row.classList.add("row");
  const start = new Date(event.start);
  const end = new Date(event.end);
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("new");
  card.innerHTML = `
    <div class="card-body">
      <h4 class="card-title">${event.name}</h5>
      <h5 class="card-subtitle mb-2 text-body-secondary">Inicio: ${start.toLocaleString()} </h5>
      <h5 class="card-subtitle mb-2 text-body-secondary">Final:${end.toLocaleString()} </h5>
      <h5 class="card-subtitle mb-2 text-body-secondary">Lugar: ${
        event.place
      }</h5>
    </div>
  `;
  row.appendChild(card);
  contenedor.appendChild(row);
});

const form = document.getElementById("form-event");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const checkboxes = document.querySelectorAll(
    "#moments > input[type=checkbox]:checked"
  );
  if (!checkboxes.length) {
    alert("Seleciona almenos una hora");
    return;
  }
  const urlSearch = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    urlSearch.append(key, value);
  }
  window.location.search = urlSearch;
});
