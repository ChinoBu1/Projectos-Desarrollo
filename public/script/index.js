const emblaNode = document.querySelector(".embla");
const options = { loop: false, draggable: false };

const embla = EmblaCarousel(emblaNode, options);

const navbar = document.getElementById("navbar-nav");
function clearActive() {
  for (const child of navbar.children) {
    if (child.classList.contains("active")) {
      child.classList.remove("active");
    }
  }
}

const Home = document.getElementById("Home");
Home.addEventListener("click", (e) => {
  e.preventDefault();
  embla.scrollTo(0);
  clearActive();
  Home.classList.add("active");
});

const Contact = document.getElementById("Contact");
Contact.addEventListener("click", (e) => {
  e.preventDefault();
  embla.scrollTo(1);
  clearActive();
  Contact.classList.add("active");
});
