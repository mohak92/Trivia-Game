var correctAnswer;
var questionsToDisp = $('<div>');
var answersToDisp = $('<div>');
document.addEventListener("DOMContentLoaded", function(){
    loadQuestion();
});

var loadQuestion = function() {
    console.log("from load question");
    var queryURL = "https://opentdb.com/api.php?amount=1";
    // Creates AJAX call for questions
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        displayQuestions(response.results);
        displayAnswers(response.results);
    });
}

function displayQuestions(questions){
    questionsToDisp.addClass('col-12');

    for(var i = 0; i < questions.length; i++){
        correctAnswer = questions[i].correct_answer;

        var myQuestions = $('<div>');
        myQuestions.addClass("row justify-content-between heading");
        var dispCategory = $('<p>');
        dispCategory.addClass("category");
        dispCategory.text("Category: " + questions[i].category);
        myQuestions.append(dispCategory);
        questionsToDisp.append(myQuestions);
        var dispQuestion = $('<h2>');
        dispQuestion.addClass("text-center");
        dispQuestion.html(questions[i].question);
        questionsToDisp.append(dispQuestion);
        
        $("#app").prepend(questionsToDisp);
    }

}

function displayAnswers(questions){
    answersToDisp.addClass('col-12');
    for(var i = 0; i < questions.length; i++){
        var possibleAnswers = questions[i].incorrect_answers;
        possibleAnswers.splice( Math.floor( Math.random() * 3 ), 0, correctAnswer);

        var answersDiv= $('<div>');
        answersDiv.addClass('questions row justify-content-around mt-4');
        for(var j = 0; j < possibleAnswers.length; j++){
            var answerHTML = $('<li>');
            answerHTML.addClass('col-12 col-md-5');
            answerHTML.text(possibleAnswers[j]);
            console.log(possibleAnswers[j]);
            //$("li").on("click", selectAnswer);
            answersDiv.prepend(answerHTML);
        }

        answersToDisp.prepend(answersDiv);
        $("#app2").prepend(answersToDisp);
    }
}