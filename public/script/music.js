const src = {
  1: {
    1: "https://www.youtube.com/embed/l-FDFsHA20w",
    2: "https://www.youtube.com/embed/bXE6B6Usj6o",
    3: "https://www.youtube.com/embed/U4lz8MN6MQA",
    4: "https://www.youtube.com/embed/CVqsQ-9GLLE",
  },
  2: {
    1: "https://www.youtube.com/embed/jpw2ebhTSKs",
    2: "https://www.youtube.com/embed/xXNTd-pgKVc",
    3: "https://www.youtube.com/embed/YPN0qhSyWy8",
    4: "https://www.youtube.com/embed/3kwvckoii1U",
  },
  3: {
    1: "https://www.youtube.com/embed/x2_xODlUkrA",
    2: "https://www.youtube.com/embed/XAqq5yqR-T4",
    3: "https://www.youtube.com/embed/Wt-qH7IQMV4",
    4: "https://www.youtube.com/embed/j6PrrulYHmc",
  },
};

const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const video4 = document.getElementById("video4");

const previous = document.getElementById("previous");
const next = document.getElementById("next");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const pages = [page1, page2, page3];

const actVideos = () => {
  pages.forEach((page) => {
    if (page.classList.contains("active")) {
      video1.setAttribute("src", src[page.dataset.page][1]);
      video2.setAttribute("src", src[page.dataset.page][2]);
      video3.setAttribute("src", src[page.dataset.page][3]);
      video4.setAttribute("src", src[page.dataset.page][4]);
    }
  });
};

const clearActive = () => {
  pages.forEach((page) => {
    if (page.classList.contains("active")) {
      page.classList.remove("active");
    }
  });
};

pages.forEach((page) => {
  page.children[0].addEventListener("click", (e) => {
    e.preventDefault();
    if (!page.classList.contains("active")) {
      clearActive();
      page.classList.add("active");
      actVideos();
    }
  });
});
