var startMenu = document.getElementById("start-menu");
var startButton = document.getElementById("start");
var questionContainer = document.getElementById("question-container");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var timer = document.getElementById("timer");
var gameOverMenu = document.getElementById("game-over-menu");
var score = document.getElementById("score");
var initialBox = document.getElementById("initials");
var allScores = document.getElementById("all-scores");
var submitButton = document.getElementById("submit")

var questionList = 0;
var time = 60;
var timerId;

// Info received from: https://rb.gy/jj541f | Sound files received from: https://rb.gy/zn8sgj

var correctSound = new Audio("assets/correct.wav");
var wrongSound = new Audio("assets/wrong.wav");

// Causes game to start
startButton.addEventListener("click", startGame)

// Removes main menu and starts first question
function startGame() {
    startMenu.setAttribute("class", "hide");
    questionContainer.removeAttribute("class");
    timerId = setInterval(timeDown, 1000);
    timer.textContent = time;
    getNewQuestion();
}

function getNewQuestion() {
    var currentQuestion = questions[questionList];
    question.textContent = currentQuestion.question;
    currentQuestion.choices.forEach(function(answer, i) {
    var answerChoice = document.createElement("button");
    answerChoice.setAttribute("class", "answer");
    answerChoice.setAttribute("value", answer);
    answerChoice.textContent = i + 1 + ". " + answer;
    answerChoice.onclick = selectAnswer;
    answers.appendChild(answerChoice);
  });
}

function selectAnswer() {
  if (this.value !== questions[questionList].answer) {
    time -= 10;
    if (time <= 0){
      gameOver();
    }
    timer.textContent = time;
    wrongSound.play()
  questionList++;
  if (questionList === questions.length) {
    gameOver();
  } else {
      //info received from: https://rb.gy/vlxtvg
      answers.innerHTML="";
      getNewQuestion();
    } 
  }
  if (this.value === questions[questionList].answer) {
    if (time <= 0){
      gameOver();
    }
    timer.textContent = time;
    correctSound.play()
  questionList++;
  if (questionList === questions.length) {
    gameOver();
  } else {
      answers.innerHTML="";
      getNewQuestion();
    }
  }
}

function timeDown() {
  time--;
  timer.textContent = time;

  if (time <= 0) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timerId)
  gameOverMenu.removeAttribute("class");
  questionContainer.setAttribute("class", "hide")
  score.textContent = time + "!"
}

submitButton.addEventListener = ("click", saveScore)

// Additional assistance for saving highscore: https://rb.gy/rnezcz

function saveScore() {
  var initials = initialBox.value();

  allScores = JSON.parse(localStorage.getItem("all-scores")) || [];
  var newScore = {
    score: time,
    initials: initials.value
  }
  allScores.push(newScore);
  window.localStorage.setItem("all-scores", JSON.stringify(allScores));
}

// list of all questions, choices, and answers
var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["Strings", "Booleans", "Alerts", "Numbers"],
      answer: "Alerts"
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
      answer: "Parentheses"
    },
    {
      question: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "Numbers and Strings",
        "Other Arrays",
        "Booleans",
        "All Of The Above"
      ],
      answer: "All Of The Above"
    },
    {
      question:
        "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
      answer: "Quotes"
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal / Bash", "for Loops", "console.log"],
      answer: "console.log"
    }
  ];