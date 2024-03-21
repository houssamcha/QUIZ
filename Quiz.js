// Quiz data for all categories (English, IQ, and Technique)
const quizData = {
    English: [
      {
        question: "Kang thought the spicy tofu dish was tasty, so he ordered it again",
        options: ["mainly", "fairly", "especially", "slightly"],
        answer: "slightly"
      },
      // Add more English quiz questions here
    ],
    IQ: [
      // Add IQ quiz questions here
    ],
    Technique: [
      {
        question: "Quel est le langage de programmation orienté objet ?",
        options: ["Java", "Python", "JavaScript", "C++"],
        answer: "Java"
      },
      {
        question: "Quelle est la syntaxe correcte pour une boucle for en JAVA ?",
        options: ["for (int i = 0; i < 5; i++)", "foreach (int i in array)", "for (i = 0; i <= 5)", "for (i < 5; i++)"],
        answer: "for (int i = 0; i < 5; i++)"
      },
      {
        question: "Lequel des éléments suivants gère une liste de pilotes de base de données dans JDBC?",
        options: ["DriverManager", "Connection", "Statement", "Statement"],
        answer: "DriverManager"
      },
      // Add more Technique quiz questions here
    ]
  };
  
  // Current category (default to English)
  let currentCategory = "English";
  
  // Global variables to track quiz state
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 180; // 3 minutes in seconds
  let timerInterval;
  
  function startQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 180;
  
    // Display the first question
    displayQuestion();
  
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function displayQuestion() {
    const question = document.getElementById("question");
    const options = document.querySelectorAll(".option-label");
    const progressBar = document.getElementById("progress-bar");
  
    // Clear previous question content
    question.textContent = "";
    options.forEach(option => option.textContent = "");
  
    // Check if there are more questions in the current category
    if (currentQuestionIndex >= quizData[currentCategory].length) {
      clearInterval(timerInterval);
      showResults();
      return;
    }
  
    // Update progress bar
    progressBar.style.width = `${(currentQuestionIndex + 1) / quizData[currentCategory].length * 100}%`;
  
    // Display current question and options
    const currentQuestion = quizData[currentCategory][currentQuestionIndex];
    question.textContent = currentQuestion.question;
    for (let i = 0; i < options.length; i++) {
      options[i].textContent = currentQuestion.options[i];
      options[i].value = currentQuestion.options[i];
    }
  }
  
  function updateTimer() {
    const timeText = document.getElementById("time-text");
    timeLeft--;
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    timeText.textContent = `<span class="math-inline">\{minutes\.toString\(\)\.padStart\(2, "0"\)\}\:</span>{seconds.toString().padStart(2, "0")}`;
  
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Out of time! Moving to the next question.");
      checkAnswer(); // Submit the answer automatically if time runs out
    }
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
  
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }
  
    const answer = selectedOption.value;
    const correctAnswer = quizData[currentCategory][currentQuestionIndex].answer;
  
    if (answer === correctAnswer) {
      score++;
    }
  
    currentQuestionIndex++;
    displayQuestion();
  }
  