const body = document.querySelector("body");
const header = document.querySelector("header");
const topResBtn = document.createElement("button");
topResBtn.innerText = "Показать лучшие результаты";
topResBtn.addEventListener("click", loadTopResults);

export function loadResults(score) {
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    body.innerHTML = "";
    body.append(header);
    const resultBlock = document.createElement("div");
    resultBlock.classList.add("resultBlock");
    resultBlock.classList.add("wrapper");
  
    const resultMsg = document.createElement("p");
    const resultBtn = document.createElement("button");
  
    resultBtn.addEventListener("click", newGame);
    function newGame() {
      location.reload();
    }
    resultBtn.innerText = "Заново?";
    if (score == 30) {
      resultMsg.innerText = `Поздравляем! Вы победили в викторине!`;
    } else {
      resultMsg.innerText = `Поздравляем! Вы набрали ${score} баллов из 30!`;
    }
    resultBlock.append(resultMsg, resultBtn);
    resultBlock.append(topResBtn);
    body.append(resultBlock);
  }
  
export function loadTopResults() {
    body.innerHTML = "";
    body.append(header);
    const topResultBlock = document.createElement("div");
    topResultBlock.classList.add("topResultBlock");
    topResultBlock.classList.add("wrapper");
    let res = localStorage
      .getItem("gameResults")
      .split(",")
      .sort((a, b) => {
        return b - a;
      });
    for (let i = 0; i < 10; i++) {
      let topScore = document.createElement("p");
      if (res[i] == undefined) topScore.innerText = `${i + 1}.`;
      else topScore.innerText = `${i + 1}. ${res[i]}`;
      topScore.classList.add("topScore");
      topResultBlock.append(topScore);
    }
  
    const resultBtn = document.createElement("button");
    resultBtn.innerText = "Новая Игра";
    resultBtn.addEventListener("click", newGame);
    function newGame() {
      location.reload();
    }
  
    topResultBlock.append(resultBtn);
    body.append(topResultBlock);
  }


