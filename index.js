console.log("Quiz script loaded successfully!"); //check that script loaded
// All questions for the quiz
const questions = [
    {
        topic: "Key Terms",
        question: "What does HTML stand for?",
        possibleAnswers: [],
        correctAnswer: "HyperText Markup Language",
        type: "FillInTheBlank",
    },
    {
        topic: "What is HTML?",
        question: "HTML is a programming language?",
        possibleAnswers: ["True", "False"],
        correctAnswer: "False",
    },
    {
        topic: "HTML Now",
        question: "What is the current version of HTML?",
        possibleAnswers: ["3", "4.02", "5", "3.01"],
        correctAnswer: "5",
    },
    {
        topic: "Key Terms",
        question: "Which of the following are valid HTML tags?",
        possibleAnswers: ["< listed >", "< head >", "< link >", "< li >"],
        correctAnswer: ["< head >", "< link >", "< li >"],
        type: "multipleChoice",
    },
    {
        topic: "History of HTML",
        question: "Who created HTML?",
        possibleAnswers: ["Tim Berners-Lee", "Dave Ragget", "James Gosling", "Håkon Wium Lie"],
        correctAnswer: "Tim Berners-Lee",
    },
];
// Elements from the HTML
const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const nextButton = document.getElementById("nextButton");
const resultDiv = document.getElementById("result");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
// Variables to keep track of the quiz state
let currentQuestionIndex = 0;
let score = 0;
let wrong = 0;

// Initial setup
nextButton.classList.add("hide");
resultDiv.classList.add("hide");

// Event listeners for start button
startButton.addEventListener("click", () => {
    startButton.classList.add("hide");
    startButton.style.display = "none"; // Hide the start button
    resultDiv.classList.add("hide");
    score = 0; // Reset score
    wrong = 0; // Reset wrong answers
    document.querySelector(".quizContainer").classList.remove("hide");
    startQuiz(0);
});

// Event listener for next button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        nextButton.classList.add("hide");
        const resultDiv = document.getElementById("result");
        resultDiv.classList.remove("hide");
        resultDiv.innerHTML = `<h3>Quiz completed!</h3>
        <p>Correct Answers: ${score}</p>
        <p>Wrong Answers: ${wrong}</p>
        <p>Total Score: ${score} out of ${questions.length}</p>`;
        restartButton.classList.remove("hide");
        return;
    }
    startQuiz(currentQuestionIndex);
});

// Event listener for restart button
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0; // Reset score
    wrong = 0; // Reset wrong answer
    resultDiv.classList.add("hide");
    restartButton.classList.add("hide");
    quizProgress.innerHTML = "";
    questionContainer.innerHTML = "";
    answerContainer.innerHTML = "";
    resultDiv.innerHTML = ""; // Clear previous results
    const allButtons = document.querySelectorAll(".answerContainer button");
    allButtons.forEach(button => {
        button.disabled = false; // Enable all buttons
        button.classList.remove("correct", "incorrect"); // Remove any previous styles
    });
    document.querySelector(".quizContainer").classList.remove("hide");
    startQuiz(0);
});


// Function to start the quiz, beginning with the first question
function startQuiz(index) {
    // Hide the next button initially
    nextButton.classList.add("hide");
    // If the index is 0, reset the score and hide the result div
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
    // for fill-in-the-blank questions
    if (questions[index].type === "FillInTheBlank") {
        // Create an input field for the answer
        answerContainer.innerHTML = `<input type="text" id="answerInput" placeholder="Type your answer here: ">
        <button id="submitFITB">Submit</button>`;
        // Add an event listener to the submit button
        const subBtn = document.getElementById("submitFITB");
        // Enable the submit button
        subBtn.addEventListener("click", () => {
            const answerInput = document.getElementById("answerInput").value.trim();
            const correct = questions[index].correctAnswer.trim();
            if (answerInput.toLowerCase() === correct.toLowerCase()) {
                answerContainer.innerHTML = `<p class="correct">Correct! The answer is: ${correct}</p>`;
                score++;
            } else {
                answerContainer.innerHTML = `<p class="incorrect">Incorrect. The correct answer is: ${correct}</p>`;
                wrong++;
            }
            nextButton.classList.remove("hide");
            subBtn.disabled = true; // Disable the submit button after submission
            document.getElementById("answerInput").disabled = true; // Disable the input field
        });
        // for multiple choice questions
    } else if (questions[index].type === "multipleChoice") {
        // Create checkboxes for multiple choice answers
        questions[index].possibleAnswers.forEach((answer) => {
            answerContainer.innerHTML +=`<label> <input type="checkbox" name="multiChoice"
            value="${answer}"/> ${answer}</label><br>`;
        });
        answerContainer.innerHTML += `<button id="submitMC">Submit</button>`;
        // Add an event listener to the submit button for multiple choice
        document.getElementById("submitMC").addEventListener("click", () => {
            const checkboxes = answerContainer.querySelectorAll('input[type="checkbox"]');
            const selectedAnswers = [];
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    selectedAnswers.push(cb.value.trim());
                }
            });
            // addition of classes to show correct and incorrect answers
            // Check if the selected answers match the correct answers
            const correctAnswers = questions[index].correctAnswer.map(a => a.trim());
            const allCorrect = selectedAnswers.every(a => correctAnswers.includes(a));
            const allRequired = correctAnswers.every(a => selectedAnswers.includes(a));
            if (allCorrect && allRequired) {
                score++;
                answerContainer.innerHTML = `<p class="correct">Correct! The answers are: ${correctAnswers.join(", ")}</p>`;
            } else {
                wrong++;
                answerContainer.innerHTML = `<p class="incorrect">Incorrect. The correct answers are: ${correctAnswers.join(", ")}</p>`;
            }
            nextButton.classList.remove("hide");
        });
    } else {
    // for multiple choice questions
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
                    if (btn === e.target) {
                        wrong++;
                    } 
                }
            });
            nextButton.classList.remove("hide");
        });
    });
    nextButton.classList.add("hide");
}
}
