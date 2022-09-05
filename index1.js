function Question(qText, options, ans) {
    this.qText = qText;
    this.options = options;
    this.ans = ans;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.qIndex = 0;
}

Quiz.prototype.isQuizEnded = function() {
    return this.qIndex === this.questions.length;
}

let questionsList = [
    new Question("Javascript supports",
    ["Function", "XHTML", "CSS", "HTML"],
    "Function"),
    new Question("Which Language is used for styling web pages",
    ["HTML", "jQuery", "CSS", "XML"],
    "CSS"),
    new Question("Which is not a JS Framework",
    ["Python script", "jQuery", "Django", "Node.js"],
    "Django"),
    new Question("Which is getting used to connect DB",
    ["PHP", "HTML", "JS", "All"],
    "PHP"),
    new Question("Javascript is a",
    ["Language", "Programming Language", "Development", "All"],
    "Programming Language")
]

let quiz = new Quiz(questionsList)

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.qIndex]
}

Quiz.prototype.checkOptionWithAnswer = function(option){
    if(this.getQuestionByIndex().ans === option) {
        this.score++;
    }
    this.qIndex++;
}

function handleChoiceBtn(btnId, option) {
    let btn = document.getElementById(btnId);
    btn.onclick = function(){
        // check Answer -- quiz
        quiz.checkOptionWithAnswer(option)
        loadAQuestion();
    }
}

function loadAQuestion() {
    if(quiz.isQuizEnded()){
        showScores();
    } else {
        let question = document.getElementById("question")
        question.innerHTML = quiz.getQuestionByIndex().qText;

        let options = quiz.getQuestionByIndex().options;
        for(let i = 0; i < options.length; i++) {
            let eachOption = document.getElementById("choice"+i);
            eachOption.innerHTML = options[i];
            handleChoiceBtn("btn"+i, options[i]);
        }
        showProgress();
    }
}

function showScores(){
    let result = "<h1>Result<h1>"
    result += "<h2 id='score'> Your score is " + quiz.score + " and perentage is " + ((quiz.score/quiz.questions.length)*100) + "%<h2>"
    let quizElem= document.getElementById("quiz");
    quizElem.innerHTML = result;
    setTimeout(function(){
        window.location.reload();
     }, 5000);
}

loadAQuestion();

function showProgress(){
    let progressElement = document.getElementById("progress")
    progressElement.innerHTML = "Question " + (quiz.qIndex+1) + " of " + quiz.questions.length;
}
