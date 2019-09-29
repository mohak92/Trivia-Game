var correctAnswer;

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
    });
}

function displayQuestions(questions){
    //var questionsToDisp = $('<div>');
   // quastionsToDisp.addClass('col-12');

    for(var i = 0; i < questions.length;i++){
        correctAnswer = questions[i].correct_answer;

        let possibleAnswers = questions[i].incorrect_answers;
        possibleAnswers.splice( Math.floor( Math.random() * 3 ), 0, correctAnswer);

        console.log(possibleAnswers);
        console.log(questions[i]);
    }
}