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
    console.log(questions);
}