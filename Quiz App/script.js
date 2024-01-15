const questions = [
    {
        question: "What is Cloud Computing used for?",
        answers:[
            {text: "Storage", correct: false},
            {text: "Servers", correct: false},
            {text: "Database", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "Who is the father of cloud computing?",
        answers:[
            {text: "Shron B. Codd", correct: false},
            {text: "Edgar Frank Codd", correct: false},
            {text: "J.C.R Licklider", correct: true},
            {text: "Charles Bachman", correct: false},
        ]
    },
    {
        question: "Which of the following model attempts to categorize a cloud network based on four dimensional factors?",
        answers:[
            {text: "Cloud cube", correct: true},
            {text: "Cloud square", correct: false},
            {text: "Cloud service", correct: false},
            {text: "All of the above", correct: false},
        ]
    },
    {
        question: "Which of the following is not a type of cloud server?",
        answers:[
            {text: "Public", correct: false},
            {text: "Private", correct: false},
            {text: "Dedicated", correct: false},
            {text: "Merged", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    }); 
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();