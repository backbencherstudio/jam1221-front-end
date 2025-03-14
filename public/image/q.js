let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
const totalQuestions = 40;
let quizStarted = false;

async function startQuiz() {
    if (quizStarted) return;
    
    quizStarted = true;
    const language = document.getElementById("language").value;
    const quizContainer = document.getElementById("quiz");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    const restartButton = document.getElementById("restartButton");
    const resultContainer = document.getElementById("result");
    const languageSelector = document.getElementById("language");
    
    if (!language) return;
    
    languageSelector.setAttribute("disabled", "true");
    
    const file = language === "sv" ? "q.json" : language === "ar" ? "a.json" : "e.json";
    
    try {
        const response = await fetch(file);
        let allQuestions = await response.json();
        
        questions = getRandomQuestions(allQuestions, totalQuestions);
        
        if (questions.length > 0) {
            userAnswers = new Array(questions.length).fill(null);
            currentQuestionIndex = 0;
            quizContainer.classList.remove("hidden");
            prevButton.classList.remove("hidden");
            nextButton.classList.remove("hidden");
            submitButton.classList.remove("hidden");
            restartButton.classList.add("hidden");
            resultContainer.classList.add("hidden");
            
            showQuestion();
        }
    } catch (error) {
        console.error("Fel vid inläsning av frågorna:", error);
    }
}

function getRandomQuestions(allQuestions, num) {
    let selectedQuestions = [];
    let usedIndexes = new Set();
    
    while (selectedQuestions.length < num && usedIndexes.size < allQuestions.length) {
        let randomIndex = Math.floor(Math.random() * allQuestions.length);
        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            selectedQuestions.push(allQuestions[randomIndex]);
        }
    }
    
    return selectedQuestions;
}

function showQuestion() {
    const quizContainer = document.getElementById("quiz");
    const questionData = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>Fråga ${currentQuestionIndex + 1} av ${totalQuestions}</h2>
        <h3>${questionData.question}</h3>
        <div>
            ${questionData.options.map((option, index) => `
                <label>
                    <input type="radio" name="answer" value="${index}" ${userAnswers[currentQuestionIndex] === index ? "checked" : ""}>
                    ${option}
                </label>
            `).join("<br>")}
        </div>
    `;
    
    document.getElementById("submitButton").style.display = (currentQuestionIndex === questions.length - 1) ? "block" : "none";
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

function showScore() {
    saveAnswer();
    let score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    document.getElementById("result").innerHTML = `Ditt resultat: ${score} av ${questions.length}`;
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("restartButton").classList.remove("hidden");
}

function restartQuiz() {
    quizStarted = false;
    questions = [];
    userAnswers = [];
    currentQuestionIndex = 0;
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("restartButton").classList.add("hidden");
    document.getElementById("language").removeAttribute("disabled");
}
