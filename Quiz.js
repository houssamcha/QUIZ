const quizData = [
  {
    question: "Question 1 en anglais?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
    test: "Test Anglais:"
  },
  {
    question: "Question 2 en anglais?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
    test: "Test Anglais:"
  },
  {
    question: "Question 3 en anglais?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option C",
    test: "Test Anglais:"
  },
  {
    question: "Question 4 en anglais?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option D",
    test: "Test Anglais:"
  },
  {
    question: "Question 1 pour le test IQ?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
    test: "Test IQ:"
  },
  {
    question: "Question 2 pour le test IQ?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
    test: "Test IQ:"
  },
  {
    question: "Question 3 pour le test IQ?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option C",
    test: "Test IQ:"
  },
  {
    question: "Question 4 pour le test IQ?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option D",
    test: "Test IQ:"
  },
  {
    question: "Question 1 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
    test: "Test Technique:"
  },
  {
    question: "Question 2 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
    test: "Test Technique:"
  },
  {
    question: "Question 3 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option C",
    test: "Test Technique:"
  },
  {
    question: "Question 4 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option D",
    test: "Test Technique:"
  },
  {
    question: "Question 5 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
    test: "Test Technique:"
  },
  {
    question: "Question 6 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
    test: "Test Technique:"
  },
  {
    question: "Question 7 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option C",
    test: "Test Technique:"
  },
  {
    question: "Question 8 pour le test technique?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option D",
    test: "Test Technique:"
  }
];

document.addEventListener('DOMContentLoaded', function() {
  const titleElement = document.querySelector('h1.txt');
  const timeText = document.querySelector('.time-text');
  const progressBar = document.querySelector('.progress-bar');
  const form = document.querySelector('form'); 
  const displayElement = document.querySelector('.display');
  const optionsContainer = document.querySelector('.options-container');

  let currentQuestionIndex = 0;
  let totalQuestions = 16; 
  let timeRemaining = 1200; 
  let timerInterval;

  function displayQuestion() {
      const currentQuestion = quizData[currentQuestionIndex];
      titleElement.textContent = currentQuestion.test;
      displayElement.textContent = currentQuestion.question;
      updateProgress();

      optionsContainer.innerHTML = '';
      currentQuestion.options.forEach((option, index) => {
          const label = document.createElement('label');
          label.classList.add('form-check-label');
          label.innerHTML = `
              <input class="form-check-input" type="radio" name="answer" id="answer${index + 1}" value="${option}">
              ${option}
          `;
          const div = document.createElement('div');
          div.classList.add('form-check');
          div.appendChild(label);
          optionsContainer.appendChild(div);
      });
  }

  function updateProgress() {
      const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
      progressBar.style.width = `${progress}%`;
  }

  function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex >= totalQuestions) {
          clearInterval(timerInterval);
          alert('Fin du quiz !');
          return;
      }
      displayQuestion();
  }

  function startTimer() {
      timerInterval = setInterval(() => {
          timeRemaining--;
          const minutes = Math.floor(timeRemaining / 60);
          const seconds = timeRemaining % 60;
          timeText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          if (timeRemaining <= 0) {
              clearInterval(timerInterval);
              alert('Temps écoulé !');
          }
      }, 1000);
  }

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      const selectedAnswer = form.querySelector('input[name="answer"]:checked');
      if (!selectedAnswer) {
          alert('Veuillez sélectionner une réponse.');
          return;
      }

      const currentQuestion = quizData[currentQuestionIndex];
      const correctAnswer = currentQuestion.answer;

      if (selectedAnswer.value === correctAnswer) {
          alert('Bonne réponse !');
      } else {
          alert('Mauvaise réponse. La réponse correcte est : ' + correctAnswer);
      }

      nextQuestion();
  });

  function changeTitle() {
      if (currentQuestionIndex === 4) {
          titleElement.textContent = 'Test IQ:';
      } else if (currentQuestionIndex === 8) {
          titleElement.textContent = 'Test Technique:';
      } else {
          titleElement.textContent = 'Test Anglais:';
      }
  }

  function handleClick() {
      changeTitle();
  }

  document.getElementById('nextButton').addEventListener('click', handleClick);

  displayQuestion();
  startTimer();
});

