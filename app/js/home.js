import { loadTopResults as loadTopResults } from "./loadResults.js";
import birdsData from "./birdsData.js";

const rB = document.querySelector("#records");
rB.addEventListener("click", loadTopResults);
const nB = document.querySelector("#newGame");

const galletyBtn = document.querySelector("#gallery");

galletyBtn.addEventListener("click", loadGallery);

function loadGallery() {
  let n = 0;
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const nxtBtn = document.createElement("button");
  const prvBtn = document.createElement("button");
  nxtBtn.innerText = ">";

  prvBtn.innerText = ">";
  body.innerHTML = "";
  body.append(header);
  body.append(fillGallery(n));
  body.append(nxtBtn);
  function updateGallery() {
    if (n>=5) n =0;
    n++;
    body.innerHTML = "";
    body.append(header);
    body.append(fillGallery(n));
    body.append(nxtBtn);
    // fillGallery(n);
    // console.log(n)
    // console.log(fillGallery(n))
  }
  nxtBtn.addEventListener("click", updateGallery);
  body.append(footer);
}

function fillGallery(n) {
  const galleryDiv = document.createElement("div");
  galleryDiv.classList.add("wrapper");
  galleryDiv.classList.add("gallery-container");
  for (let i = 0; i < birdsData.length; i++) {
    let galleryCard = document.createElement("div");
    // let itemAudio = document.createElement('audio');
    // itemAudio.src = birdsData[n][i].audio
    // itemAudio.controls = true;
    galleryCard.classList.add("gallery-container__gallery-item");
    galleryCard.innerHTML = `<img class="gallery-item__image" src=${birdsData[n][i].image}></img><div class="item-right"><h2 class="gallery-item__name">${birdsData[n][i].name}</h2>
    <audio controls src=${birdsData[n][i].audio}></audio></div>
    <p class="gallery-item__description">${birdsData[n][i].description}</p>
    `;
    // galleryCard.append(itemAudio)
    galleryDiv.append(galleryCard);
  }
  return galleryDiv;
}
