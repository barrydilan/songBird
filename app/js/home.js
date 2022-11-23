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
  nxtBtn.innerText = "Вперед";
  prvBtn.innerText = "Назад";
  nxtBtn.setAttribute("style", "right:0%")
  prvBtn.setAttribute("style", "left:0%")

  nxtBtn.classList.add("nxtButtons");
  prvBtn.classList.add("nxtButtons");


  body.innerHTML = "";
  body.append(header);
  body.append(fillGallery(n));
  body.append(prvBtn);
  body.append(nxtBtn);
  function nxtGallery() {
    if (n>=5) n =0;
    n++;
    audio.pause()
    body.innerHTML = "";
    body.append(header);
    body.append(fillGallery(n));
    body.append(prvBtn);
    body.append(nxtBtn);
  }

  function prvGallery() {
    if (n==0) n=5;
    n--;
    audio.pause()
    body.innerHTML = "";
    body.append(header);
    body.append(fillGallery(n));
    body.append(prvBtn);
    body.append(nxtBtn);
  }

  nxtBtn.addEventListener("click", nxtGallery);
  prvBtn.addEventListener("click", prvGallery);
  body.append(footer);
}
let audio = new Audio();
function fillGallery(n) {
  const galleryDiv = document.createElement("div");
  galleryDiv.classList.add("wrapper");
  galleryDiv.classList.add("gallery-container");
  for (let i = 0; i < birdsData.length; i++) {
    let galleryCard = document.createElement("div");
    let playBtn = document.createElement("img");
    playBtn.src = 'app/src/play.svg'
    playBtn.classList.add("playBtn");
    
    playBtn.addEventListener("click", () => {
      
      if (!audio.paused) {console.log("daw"); audio.pause(); playBtn.src = 'app/src/play.svg'; return}
      audio.src = birdsData[n][i].audio;
      playBtn.src = 'app/src/stop.svg';
      audio.play();
    })

    galleryCard.classList.add("gallery-container__gallery-item");
    galleryCard.innerHTML = `<img class="gallery-item__image" src=${birdsData[n][i].image}></img><div class="item-right"><h2 class="gallery-item__name">${birdsData[n][i].name}</h2>
    <span class="species">${birdsData[n][i].species}</span>
    </div>
    <p class="gallery-item__description">${birdsData[n][i].description}</p>
    `;
    // galleryCard.append(itemAudio)
    galleryCard.append(playBtn)
    galleryDiv.append(galleryCard);
  }
  return galleryDiv;
}
