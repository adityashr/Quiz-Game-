const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let questionTimer
let totalTimer
let totalTimeLeft = 900 // 15 minutes = 900 seconds
let questionTimeLeft = 30
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("copy", function(e) {
  e.preventDefault();
  alert("Oops! Sorry, cheating is not allowed. Quiz submitted.");
  endQuiz("❌ Oops! Cheating is not allowed. Quiz submitted.");
});
document.addEventListener("keydown", function(e) {
  if (e.key === "F12") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === "U") {
    e.preventDefault();
  }
});
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    alert("Cheating detected! Quiz submitted.");
    endQuiz("❌ Cheating Detected! Quiz Submitted.");
  }
});
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("paste", e => e.preventDefault());

// Timer display create
const timerDisplay = document.createElement('div')
timerDisplay.style.fontSize = "18px"
timerDisplay.style.fontWeight = "bold"
timerDisplay.style.marginBottom = "10px"
questionContainerElement.prepend(timerDisplay)

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  startTotalTimer()
  setNextQuestion()
}

function startTotalTimer() {
  totalTimer = setInterval(() => {
    totalTimeLeft--
    if (totalTimeLeft <= 0) {
      clearInterval(totalTimer)
      clearInterval(questionTimer)
      endQuiz("⏰ Time is Over! Quiz Submitted.")
    }
  }, 1000)
}

function startQuestionTimer() {
  questionTimeLeft = 30
  updateTimerDisplay()

  questionTimer = setInterval(() => {
    questionTimeLeft--
    updateTimerDisplay()

    if (questionTimeLeft <= 0) {
      clearInterval(questionTimer)
      moveToNextQuestion()
    }
  }, 1000)
}

function updateTimerDisplay() {
  timerDisplay.innerText =
    `Question Time: ${questionTimeLeft}s | Total Time: ${Math.floor(totalTimeLeft/60)}:${totalTimeLeft%60}`
}

function moveToNextQuestion() {
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    setNextQuestion()
  } else {
    endQuiz("✅ Quiz Completed!")
  }
}

function setNextQuestion() {
  clearInterval(questionTimer)
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
  startQuestionTimer()
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  clearInterval(questionTimer)
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  setTimeout(moveToNextQuestion, 1000)
}

function endQuiz(message) {
  questionContainerElement.innerHTML = `<h2>${message}</h2>`
  startButton.innerText = "Restart"
  startButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
    question: 'HTML ka full form kya hai?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Home Tool Markup Language', correct: false },
      { text: 'Hyperlinks Text Mark Language', correct: false },
      { text: 'Hyper Tool Multi Language', correct: false }
    ]
  },
  {
    question: 'CSS ka use kis liye hota hai?',
    answers: [
      { text: 'Structure banane ke liye', correct: false },
      { text: 'Styling ke liye', correct: true },
      { text: 'Database ke liye', correct: false },
      { text: 'Server ke liye', correct: false }
    ]
  },
  {
    question: 'HTML ka full form kya hai?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Home Tool Markup Language', correct: false },
      { text: 'Hyperlinks Text Mark Language', correct: false },
      { text: 'Hyper Tool Multi Language', correct: false }
    ]
  },
  {
    question: 'CSS ka use kis liye hota hai?',
    answers: [
      { text: 'Structure banane ke liye', correct: false },
      { text: 'Styling ke liye', correct: true },
      { text: 'Database ke liye', correct: false },
      { text: 'Server ke liye', correct: false }
    ]
  },
  {
    question: 'JavaScript kis type ki language hai?',
    answers: [
      { text: 'Programming Language', correct: true },
      { text: 'Styling Language', correct: false },
      { text: 'Markup Language', correct: false },
      { text: 'Database Language', correct: false }
    ]
  },
  {
    question: 'CSS me color change karne ke liye kaunsa property use hota hai?',
    answers: [
      { text: 'background-color', correct: false },
      { text: 'font-style', correct: false },
      { text: 'color', correct: true },
      { text: 'display', correct: false }
    ]
  },
  {
    question: 'JS me variable declare karne ke liye kaunsa keyword use hota hai?',
    answers: [
      { text: 'var', correct: false },
      { text: 'let', correct: false },
      { text: 'const', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  {
    question: 'HTML me image add karne ke liye kaunsa tag use hota hai?',
    answers: [
      { text: '<img>', correct: true },
      { text: '<image>', correct: false },
      { text: '<pic>', correct: false },
      { text: '<src>', correct: false }
    ]
  },
  {
    question: 'CSS me Flexbox ka use kis liye hota hai?',
    answers: [
      { text: 'Layout banane ke liye', correct: true },
      { text: 'Database connect karne ke liye', correct: false },
      { text: 'Image edit karne ke liye', correct: false },
      { text: 'Server start karne ke liye', correct: false }
    ]
  },
  {
    question: 'JavaScript me console output ke liye kaunsa method use hota hai?',
    answers: [
      { text: 'print()', correct: false },
      { text: 'log()', correct: false },
      { text: 'console.log()', correct: true },
      { text: 'display()', correct: false }
    ]
  }
]
