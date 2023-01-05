// Function to start quiz when clicking Start Button
// h1 and start-btn hide and questions and answers appear
// starts timer

var startButton = document.getElementById("start-btn");
var saveButton = document.getElementById("save");
var saveName = document.getElementById("nameLabel");
var title = document.getElementById("title");
var intro = document.getElementById("intro");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var randomQ;
var currentQIndex;
var questionElement = document.getElementById("question");
var answerButtonElement = document.getElementById("answerButtons");
var myscore = 0
var score = document.getElementById("score")
var secondsLeft = 90
var timeEl = document.getElementById("time")
var timerInterval;
var endPage = document.getElementById("endPage")
var finalScore = document.getElementById("finalScore")

startButton.addEventListener("click", startQuiz)

function startQuiz() {
    startButton.classList.add("hide");
    title.classList.add("hide");
    intro.classList.add("hide");
    question.removeAttribute("hidden");
    answerButtons.removeAttribute("hidden");
    randomQ = questions.sort(() => Math.random() - .5);
    currentQIndex = 0;
    nextQuestion();
    setTime()
}

function nextQuestion(){
    showQ(randomQ[currentQIndex])
}

// showQ function hides answer1,2,3,4 buttons and creates a button for each answer
function showQ(questions){
    answer1.classList.add("hide");
    answer2.classList.add("hide");
    answer3.classList.add("hide");
    answer4.classList.add("hide");
    questionElement.innerText = questions.question;
    questions.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        answerButtonElement.appendChild(button);
        button.addEventListener("click", () => {currentQIndex++})
        button.addEventListener("click", clearPrevAnswers)
        button.addEventListener("click", selectAnswer);
    });
}

//set of questions defined as an array
var questions = [
    {
        question: "How do you declare an organized list?",
        answers: [
            {text: "<ol>", correct: true},
            {text: "<li>", correct: false},
            {text: "<ul>", correct: false},
            {text: "<p>", correct: false}
        ]
    },
    {
        question: "What method adds a child element to a parent?",
        answers: [
            {text: "childNodes", correct: false},
            {text: "lastChild", correct: false},
            {text: "appendChild", correct: true},
            {text: "parentNode", correct: false}
        ]
    },
    {
        question: "What does JSON.stringify does?",
        answers: [
            {text: "Adds a value to an array.", correct: false},
            {text: "Converts a JavaScript value to a JSON string.", correct: true},
            {text: "Converts a Web data to a JavaScript object", correct: false},
            {text: "Stores an object.", correct: false}
        ]
    },
    {
        question: "Select the 'Data Types'?",
        answers: [
            {text: "class,id,for,name", correct: false},
            {text: "h1,h2,main,header", correct: false},
            {text: "color, background, margin, padding", correct: false},
            {text: "string, number, boolean, bigInt, symbol", correct: true}
        ]
    },
    {
        question: "How do you declare a LOGICAL NOT?",
        answers: [
            {text: "not a", correct: false},
            {text: "!", correct: true},
            {text: "//", correct: false},
            {text: "--", correct: false}
        ]
    }
]

// function after selecting any question, change to next question
function selectAnswer(e){
    var selectedButton = e.target
    var correctAns = selectedButton.dataset.correct

console.log(selectedButton)
if (correctAns){
    myscore++;
}else {
    secondsLeft -= 10;
}
if (randomQ.length > currentQIndex ){
        nextQuestion()
} else {
    endQuiz()
}
score.innerText = "Score: " + (myscore);
}

function clearPrevAnswers (){
    
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

// funtion for time interval

function setTime(){
    timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval)
        // Calls function after time ends
        endQuiz();
    }

    }, 1000);
}
// function to end quiz
function endQuiz(){
    questionElement.innerText = "Quiz ended!"
    endPage.classList.remove("hide")
    finalScore.innerText = "Your final score is: " + (myscore);
    clearPrevAnswers ()
    clearInterval(timerInterval)

}

//function to save score

function saveLastScore(){
    var highscore = {
     playersName: saveName.value.trim(),
     score: myscore
 };

    var scoresArray = JSON.parse(localStorage.getItem("highscore")) || []
    scoresArray.push(highscore)
    localStorage.setItem("highscore", JSON.stringify(scoresArray))
}


// open highscores page when clicking save
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    if(saveName.value.trim() !== ""){
        saveLastScore();
        window.location.href = "highscores.html";
    }
    });
