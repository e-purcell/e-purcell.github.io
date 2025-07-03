const questions = [
    {
        topic: "Key Terms",
        question: "What does HTML stand for?",
        possibleAnswers: [],
        correctAnswer: "HyperText Markup Language",
    },
    {
        topic: "What is HTML?",
        question: "",
        possibleAnswers: [],
        correctAnswer: "",
    },
    {
        topic: "History of HTML",
        question: "",
        possibleAnswers: [],
        correctAnswer: "",
    },
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
let currentQuestionIndex = 0;

function handleQuestion(index) {
    quizProgress.innerHTML = "";
    questions.forEach((question) => {
        quizProgress.innerHTML += "<span></span>";
    });

let spans = document.querySelectorAll("span");
for (let i = 0; i <= index; i++) {
    spans[i].classList.add("seen");
}

qContainer.innerHTML = 
    <><p>${questions[index].topic}</p>
    <p>${questions[index].question}</p></>
}

handleQuestion(currentQuestionIndex);