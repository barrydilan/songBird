import birdsData from "./birdsData.js";

const victorineVariants = Array.from(document.querySelectorAll(".victorine-answers__variants-list__variant"));
const infoPic = document.querySelector(".victorine-answers__victorine-info__pic");
const infoName = document.querySelector(".victorine-answers__victorine-info__name");
const infoSound = document.querySelector(".info-audio");
const nextBtn = document.querySelector(".victorine-button__button");
const themeBtns = Array.from(document.querySelectorAll(".victorine-selector__theme"))
const correctAudioEl = document.querySelector(".correct-audio");
const correctPicEl = document.querySelector(".victorine-question__pic");
const correctNameEl = document.querySelector(".victorine-question__name")
let theme = 0;
let correctName = '';



nextBtn.addEventListener("click", nextRound);


function nextRound() {
    theme += 1;
    if (theme>5) {
        endGame();
        return
    }
    loadVictorine();
}


function updateCorrectVictorine() {
    for (let i=0; i<birdsData[theme].length; i++) {
        if (birdsData[theme][i].name == correctName) {
            correctPicEl.src = birdsData[theme][i].image;
            correctNameEl.innerText = birdsData[theme][i].name;
        }
    }
}

function updateAnswerInfo(variant){
    for (let i=0; i<birdsData[theme].length; i++) {
    if (birdsData[theme][i].name == variant) {
        infoPic.src = birdsData[theme][i].image;
        infoName.innerText = birdsData[theme][i].name;
        infoSound.src = birdsData[theme][i].audio;
    }
}
}
function infoUpdate(variant) {
    updateAnswerInfo(variant);
}




function endGame() {
    theme = 0;
    themeBtns[5].classList.remove("victorine-selector__theme--chosen");
    console.log("game over")
    loadVictorine()
}


function changeThemeBtnStyle(theme) {
    themeBtns[theme].classList.remove("victorine-selector__theme--chosen");
}


function checkAnswer(eventObj) {
    eventObj.preventDefault();
    let clickedEl = eventObj.target;
    infoUpdate(clickedEl.innerText);
    if (clickedEl.innerText == correctName) {
        updateCorrectVictorine();
    }
   
}


function loadVictorine() {
    for (let i=0; i<victorineVariants.length; i++) {
        victorineVariants[i].innerText = birdsData[theme][i].name;
        victorineVariants[i].addEventListener("click", checkAnswer)
    }
    let correct = getRandomInt(6);
    correctName = getRandomQuestion(correct);
    correctNameEl.innerText = "*****"
    themeBtns[theme].classList.add("victorine-selector__theme--chosen");
    if (theme>0) changeThemeBtnStyle(theme-1);
    
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getRandomQuestion(correct) {
    let correctName = birdsData[theme][correct].name;
    console.log(birdsData[theme][correct].name);
    return correctName;
}



loadVictorine()