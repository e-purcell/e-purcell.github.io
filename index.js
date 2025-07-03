const questions = [
    {
        topic: "Key Terms",
        question: "What does HTML stand for?",
        possibleAnswers: ["HyperText Markup Language", "HyperText Markup Link", "HyperText Markup List", "HyperText Markup Layout"],
        correctAnswer: "HyperText Markup Language",
    },
    {
        topic: "What is HTML?",
        question: "HTML is a programming language?",
        possibleAnswers: ["True", "False"],
        correctAnswer: "False",
    },
    {
        topic: "What is HTML?",
        question: "What is the current version of HTML?",
        possibleAnswers: ["3", "4.02", "5", "3.01"],
        correctAnswer: "5",
    },
    {
        topic: "History of HTML",
        question: "Who created HTML?",
        possibleAnswers: ["Tim Berners-Lee", "Dave Ragget", "James Gosling", "Håkon Wium Lie"],
        correctAnswer: "Tim Berners-Lee",
    },
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const nextButton = document.getElementById("nextButton");
const resultDiv = document.getElementById("result");
let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener("click", () => {
    startButton.classList.add("hide");
    startButton.style.display = "none"; // Hide the start button
    startQuiz(0);
});

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        document.querySelector(".quizContainer").classList.add("hide");
        nextButton.classList.add("hide");
        const resultDiv = document.getElementById("result");
        resultDiv.classList.remove("hide");
        resultDiv.innerHTML = `<h3>Your score: ${score} out of ${questions.length}</h3>`;
    }
    startQuiz(currentQuestionIndex);
});



function startQuiz(index) {
    if (index === 0) {
        score = 0; // Reset score for new quiz
        resultDiv.classList.add("hide");
        document.querySelector(".quizContainer").classList.remove("hide");
    }
    // Function handling progress bar    
    quizProgress.innerHTML = "";
    questions.forEach((question) => {
        quizProgress.innerHTML += "<span></span>";
    });
    let spans = document.querySelectorAll("span");
    for (let i = 0; i <= index; i++) {
        spans[i].classList.add("seen");
    }
    
    questionContainer.innerHTML = `<p>${questions[index].topic}</p>
    <p>${questions[index].question}</p>`;

    answerContainer.innerHTML = "";
    questions[index].possibleAnswers.forEach((answer) => {
        answerContainer.innerHTML += `<button> ${answer}</button>`;
    });
    let answers = answerContainer.querySelectorAll("button");
    answers.forEach((answer) => {
        answer.addEventListener("click", (e) => {
            // Make it so user cannot click another answer after one is selected
            answers.forEach(btn => btn.disabled = true);
            const selectedAnswer = e.target.textContent.trim();
            const correct = questions[index].correctAnswer.trim();
            //addition of classes to show correct and incorrect answers
            answers.forEach(btn => {
                const btnText = btn.textContent.trim();
                if (btnText === correct) {
                    btn.classList.add("correct");
                    if (btn === e.target) {
                        score++;
                    }
                } else {
                    btn.classList.add("incorrect");
                }
            });
            nextButton.classList.remove("hide");
        });
    });
    nextButton.classList.add("hide");
}