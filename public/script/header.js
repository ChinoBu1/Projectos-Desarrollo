const emblaNode = document.querySelector(".embla");
const options = { loop: true, draggable: false, duration: 35 };

const autoplayOptions = {
  delay: 10000,
  rootNode: (emblaRoot) => emblaRoot.parentElement,
};

const plugins = [EmblaCarouselAutoplay(autoplayOptions)]; // Plugins

const _embla = EmblaCarousel(emblaNode, options, plugins);
