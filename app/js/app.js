import birdsData from "./birdsData.js";

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
const infoText = document.querySelector(".victorine-answers__victorine-info__description")
infoText.setAttribute("style", "visibility:hidden")
const nextBtn = document.querySelector(".victorine-button__button");
const themeBtns = Array.from(
  document.querySelectorAll(".victorine-selector__theme")
);
const correctAudioEl = document.querySelector(".correct-audio");
const correctPicEl = document.querySelector(".victorine-question__pic");
const correctNameEl = document.querySelector(".victorine-question__name");
const wrongSound = new Audio('app/sound/wrong.mp3')
const rightSound = new Audio('app/sound/right.mp3')
const body = document.querySelector("body")
const header = document.querySelector("header");
const topResBtn = document.createElement("button");
topResBtn.innerText = "Показать лучшие результаты"
topResBtn.addEventListener('click', loadTopResults)
const headerHtml = header.innerHTML;
let gameResults=[];

console.log(localStorage.getItem("gameResults") !== null)
console.log(localStorage.getItem('gameResults'))

if (localStorage.getItem("gameResults") !== null) {
  let rs = localStorage.getItem('gameResults');
  console.log(rs)
  for (let i =0; i<rs.length; i++){
    if (rs[i] !== ',') gameResults.push(rs[i]);
  }
}

// const redir = document.querySelector(".redirect");
// redir.addEventListener('click', showResults);


function showResults() {
  loadResults();
}


let scoreTable = document.querySelector(".header__score");
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
  localStorage.setItem('gameResults', gameResults);
  loadResults()
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
    clickedEl.setAttribute("style", "color:green")
    if (nextBtn.hasAttribute("disabled")) {
      correctAudioEl.pause();
      rightSound.play();
    }
    nextBtn.removeAttribute("disabled");
  }
  if (nextBtn.hasAttribute("disabled")) {
    wrongSound.play()
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
  correctPicEl.src = "/app/src/bird-outline.png";
  infoPic.src = "/app/src/bird-outline.png";
  infoName.innerText = "Выбери вариант ответа";
  infoText.setAttribute("style", "visibility:hidden")
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
      infoText.setAttribute("style", "visibility:visible")
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


function loadResults() {
  body.innerHTML = ''
  body.append(header)
  const resultBlock = document.createElement("div");
  resultBlock.classList.add('resultBlock')
  resultBlock.classList.add('wrapper')

  const resultMsg = document.createElement('p');
  const resultBtn = document.createElement('button');
  
  resultBtn.addEventListener('click', newGame);
  function newGame() {
    location.reload()
  }
  resultBtn.innerText = 'Заново?';
  if (score==30) {
    resultMsg.innerText = `Поздравляем! Вы победили в викторине!`;
  }
  else {resultMsg.innerText = `Поздравляем! Вы набрали ${score} баллов из 30!`;}
  resultBlock.append(resultMsg, resultBtn);
  resultBlock.append(topResBtn);
  body.append(resultBlock);
}



function loadTopResults() {
  body.innerHTML = ''
  body.append(header)
  const topResultBlock = document.createElement("div");
  topResultBlock.classList.add('topResultBlock')
  topResultBlock.classList.add('wrapper')
  let res = localStorage.getItem("gameResults").split(",").sort((a,b) => {
    return b-a;
  })
  for (let i=0; i<10; i++) {
    let topScore = document.createElement('p');
    if (res[i] == undefined) topScore.innerText = `${i+1}.`
    else topScore.innerText = `${i+1}. ${res[i]}`;
    topScore.classList.add("topScore");
    topResultBlock.append(topScore);
  }
  
  console.log(res)
  const resultBtn = document.createElement('button');
  resultBtn.innerText = "Новая Игра"
  resultBtn.addEventListener('click', newGame);
  function newGame() {
    location.reload()
  }
  
  topResultBlock.append(resultBtn);
  body.append(topResultBlock)  
}