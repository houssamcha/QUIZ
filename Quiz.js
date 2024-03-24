const quizData = [
  // Test Anglais
  {
    question: "What is the synonym of 'quick'?",
    options: ["Slow", "Sluggish", "Rapid", "Weak"],
    answer: "Rapid",
    test: "Test Anglais:"
  },
  {
    question: "Which word is an antonym of 'ancient'?",
    options: ["Old", "Modern", "Rare", "Historic"],
    answer: "Modern",
    test: "Test Anglais:"
  },
  {
    question: "Complete the following sentence: 'If it doesn't rain, we ____ go to the park.'",
    options: ["will", "would", "can", "should"],
    answer: "will",
    test: "Test Anglais:"
  },
  {
    question: "What does the idiom 'break the ice' mean?",
    options: ["To start a conflict", "To cool down", "To initiate a conversation", "To freeze something"],
    answer: "To initiate a conversation",
    test: "Test Anglais:"
  }, 
  // Test IQ
  {
    question: "Si vous réorganisez les lettres 'CIFAIPC', vous aurez le nom d'un(e) :",
    options: ["Ville", "Animal", "Océan", "Rivière"],
    answer: "Océan",
    test: "Test IQ:"
  },
  {
    question: "Quel nombre complète le mieux l'analogie : 8:4 comme 10:",
    options: ["3", "7", "24", "5"],
    answer: "5",
    test: "Test IQ:"
  },
  {
    question: "Quelle forme complète la série ? Carré, Cercle, Triangle, ...",
    options: ["Hexagone", "Carré", "Cercle", "Triangle"],
    answer: "Carré",
    test: "Test IQ:"
  },
  {
    question: "Quel est le prochain nombre dans la séquence ? 2, 4, 8, 16, ...",
    options: ["24", "32", "40", "64"],
    answer: "32",
    test: "Test IQ:"
  },
  // Test Technique (Java - JS JavaScript)
  {
    question: "Quelle méthode peut être utilisée pour analyser une chaîne JSON en JavaScript ?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.fromString()"],
    answer: "JSON.parse()",
    test: "Test Technique:"
  },
  {
    question: "En Java, comment déclarez-vous une variable de type entier ?",
    options: ["int num;", "num int;", "int[] num;", "integer num;"],
    answer: "int num;",
    test: "Test Technique:"
  },
  {
    question:"Lequel des méthodes suivants est utilisé pour annuler une transaction JDBC?",
    options:["removeTransaction()"," rollback()"," commit()"," roll()"],
    answer:" rollback()"
  },
  {
    question: "Quel est le résultat de l'expression JavaScript '3 + 2 * 4' ?",
    options: ["20", "14", "11", "5"],
    answer: "11",
    test: "Test Technique:"
  },
  {
    question: "Comment créer une fonction en JavaScript ?",
    options: ["function maFonction() {}", "create function maFonction() {}", "function:maFonction() {}", "function = maFonction() {}"],
    answer: "function maFonction() {}",
    test: "Test Technique:"
  },
  {
    question: "Quelle instruction est utilisée pour écrire un test conditionnel en Java ?",
    options: ["select", "if", "check", "for"],
    answer: "if",
    test: "Test Technique:"
  },
  {
    question:"Lequel des éléments suivants gère une liste de pilotes de base de données dans JDBC?",
    options:["DriverManager","Connection","Statement","Statement"],
    answer:"DriverManager"
  },
  {
    question: "Quelle est la bonne façon de déclarer un tableau en Java ?",
    options: ["array[] monTableau;", "array monTableau[];", "int monTableau[];", "int[] monTableau;"],
    answer: "int[] monTableau;",
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
  function calculateScore() {
    let score = 0;
    quizData.forEach(question => {
        const selectedAnswer = form.querySelector(`input[name="answer"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.answer) {
            score++;
        }
    });
    return score;
}

function displayResults(score) {
    const mainContainer = document.querySelector('main');
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('container');
    resultContainer.style.backgroundColor = score === totalQuestions ? '#4CAF50' : '#FF5733';
    resultContainer.style.padding = '20px';
    resultContainer.style.width = '500px';
    resultContainer.style.height = '480px';
    resultContainer.style.margin = '0 auto';

    const message = document.createElement('p');
    message.classList.add('text-center', 'text-white');
    message.style.fontSize = '24px';
    message.textContent = score === totalQuestions ? 'Bravo! Score: ' + score + ', Temps: ' + (1200 - timeRemaining) + ' secondes' : 'Dommage! Score: ' + score + ', Temps: ' + (1200 - timeRemaining) + ' secondes';
    resultContainer.appendChild(message);

    mainContainer.innerHTML = '';
    mainContainer.appendChild(resultContainer);
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

    if (currentQuestionIndex === totalQuestions) {
        clearInterval(timerInterval);
        const score = calculateScore();
        displayResults(score);
    }
});

  displayQuestion();
  startTimer();
});

