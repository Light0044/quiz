
const questions=[
    {
        question:"What is Light's favourite fruit?",
        answers:[
            {text:"Apple", correct: false},
            {text:"Watermelon", correct: false},
            {text:"Pineapple", correct: true},
            {text:"Mango", correct: false},
        ]
    },
    {
        question:"How did he get his name 'Light'?",
        answers:[
            {text:"From an anime", correct: true},
            {text:"From a movie or series", correct: false},
            {text:"From one of his rolemodels", correct: false},
            {text:"From someone", correct: false},
        ]
    },
    {
        question:"What is Light's favourite anime character?",
        answers:[
            {text:"Monkey D Luffy", correct: false},
            {text:"Killua Zoldyck", correct: true},
            {text:"Uzumaki Naruto", correct: false},
            {text:"Kageyama Tobio", correct: false},
        ]
    },
    {
        question:"When is Light's birthday?",
        answers:[
            {text:"8 March 2007", correct: false},
            {text:"4 January 2007", correct: true},
            {text:"11 April 2007", correct: false},
            {text:"28 December 2007", correct: false},
        ]
    },
    {
        question:"How many girlfriend did Light have?",
        answers:[
            {text:"9", correct: false},
            {text:"0", correct: false},
            {text:"4", correct: false},
            {text:"I don't know", correct: true},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.
    question; 

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz()

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle form submission
app.post("/submit", (req, res) => {
  const userDetails = req.body;

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_password"
    }
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: "your_email@gmail.com",
    subject: "Quiz Score Submission",
    text: `Name: ${userDetails.name}\nEmail: ${userDetails.email}\nScore: ${userDetails.score}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
