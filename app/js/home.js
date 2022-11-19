import {loadTopResults as loadTopResults} from "./loadResults.js";
// const body = document.querySelector("body")
// const header = document.querySelector("header");
// const topResBtn = document.createElement("button");
// topResBtn.innerText = "Показать лучшие результаты"
// topResBtn.addEventListener('click', loadTopResults)
// const headerHtml = header.innerHTML;
// let gameResults=[];

const rB = document.querySelector("#records");
rB.addEventListener("click", loadTopResults);
const nB = document.querySelector("#newGame")



// function loadTopResults() {
//     console.log("Dwa")
//     body.innerHTML = ''
//     body.append(header)
//     const topResultBlock = document.createElement("div");
//     topResultBlock.classList.add('topResultBlock')
//     topResultBlock.classList.add('wrapper')
//     let res = localStorage.getItem("gameResults").split(",").sort((a,b) => {
//       return b-a;
//     })
//     for (let i=0; i<10; i++) {
//       let topScore = document.createElement('p');
//       topScore.classList.add("topScore");
//       topScore.innerText = `${i+1}. ${res[i]}`;
//       topResultBlock.append(topScore);
//     }
    
//     console.log(res)
//     const resultBtn = document.createElement('button');
//     resultBtn.innerText = "Новая Игра"
//     resultBtn.addEventListener('click', newGame);
//     function newGame() {
//       location.reload()
//     }
    
//     topResultBlock.append(resultBtn);
//     body.append(topResultBlock)  
//   }