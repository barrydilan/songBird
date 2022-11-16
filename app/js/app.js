import birdsData from "./birdsData.js";
import {loadResults as loadResults } from "./loadResults.js";
import {loadTopResults as loadTopResults} from "./loadResults.js";


///todo BLOCK TOP RESULTS BUTTON ON HOME PAGE
const victorineVariants = Array.from(
  document.querySelectorAll(".victorine-answers__variants-list__variant")
);
const infoPic = document.querySelector(
  ".victorine-answers__victorine-info__pic"
);
const infoName = document.querySelector(
  ".victorine-answers__victorine-info__name"
);
const infoSound = document.querySelector(".info-audio");
const infoText = document.querySelector(
  ".victorine-answers__victorine-info__description"
);
infoText.setAttribute("style", "visibility:hidden");
const nextBtn = document.querySelector(".victorine-button__button");
const themeBtns = Array.from(
  document.querySelectorAll(".victorine-selector__theme")
);
const correctAudioEl = document.querySelector(".correct-audio");
const correctPicEl = document.querySelector(".victorine-question__pic");
const correctNameEl = document.querySelector(".victorine-question__name");
const wrongSound = new Audio("app/sound/wrong.mp3");
const rightSound = new Audio("app/sound/right.mp3");
// const body = document.querySelector("body");
// const header = document.querySelector("header");
// const topResBtn = document.createElement("button");
// topResBtn.innerText = "Показать лучшие результаты";
// topResBtn.addEventListener("click", loadTopResults);
let gameResults = [];

if (localStorage.getItem("gameResults") !== null) {
  let rs = localStorage.getItem("gameResults");
  console.log(rs);
  for (let i = 0; i < rs.length; i++) {
    if (rs[i] !== ",") gameResults.push(rs[i]);
  }
}

// function showResults() {
//   loadResults();
// }

const scoreTable = document.querySelector(".header__score");
let score = 0;
let tryCounter = 0;
let theme = 0;
let correctName = "";

nextBtn.addEventListener("click", nextRound);

function nextRound() {
  theme += 1;
  if (theme > 5) {
    endGame();
    return;
  }
  loadVictorine();
}

function endGame() {
  gameResults.push(+score);
  localStorage.setItem("gameResults", gameResults);
  loadResults(score);
  theme = 0;
  themeBtns[5].classList.remove("victorine-selector__theme--chosen");
  console.log("game over");
  score = 0;
  loadVictorine();
}

function checkAnswer(eventObj) {
  let scoreUpdate = 0;
  tryCounter++;
  eventObj.preventDefault();
  let clickedEl = eventObj.target;
  infoUpdate(clickedEl.innerText);
  if (clickedEl.innerText == correctName) {
    updateCorrectVictorine();
    scoreUpdate = 6 - tryCounter;
    tryCounter = 0;
    score += scoreUpdate;
    scoreTable.innerText = "Score: " + score;
    clickedEl.setAttribute("style", "color:green");
    if (nextBtn.hasAttribute("disabled")) {
      correctAudioEl.pause();
      rightSound.play();
    }
    nextBtn.removeAttribute("disabled");
  }
  if (nextBtn.hasAttribute("disabled")) {
    wrongSound.play();
    clickedEl.setAttribute("style", "color:red");
  }
}

function loadVictorine() {
  for (let i = 0; i < victorineVariants.length; i++) {
    victorineVariants[i].removeAttribute("style");
    victorineVariants[i].innerText = birdsData[theme][i].name;
    victorineVariants[i].addEventListener("click", checkAnswer);
  }
  scoreTable.innerText = "Score: " + score;
  let correct = getRandomInt(6);
  correctName = getRandomQuestion(correct);
  correctNameEl.innerText = "*****";
  correctPicEl.src = "app/src/bird-outline.png";
  infoPic.src = "app/src/bird-outline.png";
  infoName.innerText = "Выбери вариант ответа";
  infoText.setAttribute("style", "visibility:hidden");
  infoSound.setAttribute("style", "visibility: hidden");
  themeBtns[theme].classList.add("victorine-selector__theme--chosen");
  if (theme > 0) changeThemeBtnStyle(theme - 1);
  nextBtn.setAttribute("disabled", "true");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomQuestion(correct) {
  let correctName = birdsData[theme][correct].name;
  correctAudioEl.src = birdsData[theme][correct].audio;
  console.log(birdsData[theme][correct].name);
  return correctName;
}

function changeThemeBtnStyle(theme) {
  themeBtns[theme].classList.remove("victorine-selector__theme--chosen");
}

function updateAnswerInfo(variant) {
  for (let i = 0; i < birdsData[theme].length; i++) {
    if (birdsData[theme][i].name == variant) {
      infoPic.src = birdsData[theme][i].image;
      infoName.innerText = birdsData[theme][i].name;
      infoSound.setAttribute("style", "visibility: visible");
      infoSound.src = birdsData[theme][i].audio;
      infoText.setAttribute("style", "visibility:visible");
      infoText.innerText = birdsData[theme][i].description;
    }
  }
}

function infoUpdate(variant) {
  updateAnswerInfo(variant);
}

function updateCorrectVictorine() {
  for (let i = 0; i < birdsData[theme].length; i++) {
    if (birdsData[theme][i].name == correctName) {
      correctPicEl.src = birdsData[theme][i].image;
      correctNameEl.innerText = birdsData[theme][i].name;
    }
  }
}

loadVictorine();

