var highScoreList = document.getElementById("scoreList")
var lastScore = JSON.parse(localStorage.getItem("highscore")) || []


function getFromLocalStorage(){
  console.log(lastScore)
lastScore.playersName !== null
//highScoreList.innerHTML = lastScore.playersName +": " + lastScore.score;
for(var i = 0; i<lastScore.length; i++){
  var listItem =document.createElement("li")
  listItem.innerText = lastScore[i].playersName +": " + lastScore[i].score;
highScoreList.appendChild(listItem)
}
}
getFromLocalStorage()

//Clear Score Button
var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  localStorage.clear();
  highScoreList.classList.add("hide")
}

)
