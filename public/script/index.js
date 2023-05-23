const noticias = document.getElementById("noticias");
const eventos = document.getElementById("eventos");

const resp = await fetch("/api/news/index");
const noticias1 = await resp.json();

for (const noticia of noticias1) {
  const date = new Date(noticia.date);
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("new-index");
  card.classList.add("col-md-4");
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${noticia.title}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${date.toLocaleDateString()}</h6>
      <p class="card-text">${noticia.text}</p>
    </div>
  `;
  noticias.appendChild(card);
}

const resp1 = await fetch("api/event/index");
const eventos1 = await resp1.json();
eventos1.forEach((event) => {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("new");
  card.classList.add("col-md-6");
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
  eventos.appendChild(card);
});
