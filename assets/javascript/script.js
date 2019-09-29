let correctAnswer;
let correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct') : 0);
let incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect') : 0);
var countDown = 16;
var intervalId;

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();

    eventListeners();

    run();
});

function run() {
     clearInterval(intervalId);
     intervalId = setInterval(decrement, 1000);
   }

function decrement() {

     //  Decrease number by one.
     countDown--;

     //  Show the number in the #show-number tag.
     const countDownDisp = document.createElement('h3');
     document.getElementById("timer").innerHTML = "";
     countDownDisp.innerHTML = "Time remaining to answer this question: " + countDown;
     document.querySelector('#timer').appendChild(countDownDisp);

     //  Once number hits zero...
     if (countDown  === 0) {
          document.getElementById("app").innerHTML = "";
          loadQuestion();
   }
}

function eventListeners () {
     document.querySelector('#check-answer').addEventListener('click', validateAnswer);

     document.querySelector('#clear-storage').addEventListener('click', clearResults);
}

// loads a new question from an API
 function loadQuestion(){
     countDown = 16;
     const url = 'https://opentdb.com/api.php?amount=1';
     fetch(url)
          .then(data => data.json())
          .then(result  =>  displayQuestion(result.results));
}

// displays the question HTML from API

 function displayQuestion(questions){

     
     // create the HTML Question
     const questionHTML = document.createElement('div');
     questionHTML.classList.add('col-12');

     questions.forEach(function(question){
          // read the correct answer 
          correctAnswer = question.correct_answer;
          console.log(correctAnswer);
          // inject the correct answer in the possible answers
          let possibleAnswers = question.incorrect_answers;
          possibleAnswers.splice( Math.floor( Math.random() * 3 ), 0, correctAnswer );

  
          // add the HTML for the Current Question
          questionHTML.innerHTML = `
               <div class="row justify-content-between heading">
                    <p class="category">Category:  ${question.category}</p>
                    <div class="totals">
                         <span class="badge badge-success">Correct: ${correctNumber}</span>
                         <span class="badge badge-danger">Wrong: ${incorrectNumber}</span>
                    </div>
               </div>
               <h2 class="text-center">${question.question}

          `;

          // generate the HTML for possible answers
          const answerDiv = document.createElement('div');
          answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
          possibleAnswers.forEach(function(answer) {
               const answerHTML = document.createElement('li');
               answerHTML.classList.add('col-12', 'col-md-5');
               answerHTML.innerHTML = answer;
               // attach an event click the answer is clicked
               answerHTML.onclick = selectAnswer;
               answerDiv.appendChild(answerHTML);
          });
          questionHTML.appendChild(answerDiv);

          // render in the HTML
          document.querySelector('#app').appendChild(questionHTML);
     })
}

// when the answer is selected
 function selectAnswer(e){

     // removes the previous active class for the answer
     if(document.querySelector('.active')){
          const activeAnswer = document.querySelector('.active');
          activeAnswer.classList.remove('active');

     }
     // adds the current answer
     e.target.classList.add('active');
}

// Checks if the answer is correct and 1 answer is selected
function validateAnswer () {
     if(document.querySelector('.questions .active') ) {
          // everything is fine, check if the answer is correct or not
          checkAnswer();
     } else {
          // error, the user didn't select anything
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
          errorDiv.textContent = 'Please select 1 answer';
          // select the questions div to insert the alert
          const questionsDiv = document.querySelector('.questions');
          questionsDiv.appendChild(errorDiv);

          // remove the error
          setTimeout(function() {
               document.querySelector('.alert-danger').remove();
          }, 3000);
     }
}

// check if the answer is correct or not
function checkAnswer() {
     const userAnswer = document.querySelector('.questions .active');

     if(userAnswer.textContent === correctAnswer) {
          correctNumber++;
     } else {
          incorrectNumber++;
     }
     // save into localstorage
     saveIntoStorage();

     // clear previous HTML
     const app = document.querySelector('#app');
     while(app.firstChild) {
          app.removeChild(app.firstChild);
     }

     // load a new question
     loadQuestion();
}

// saves correct or incorrect totals in storage
function saveIntoStorage () {
     localStorage.setItem('quiz_game_correct', correctNumber);
     localStorage.setItem('quiz_game_incorrect', incorrectNumber);
     
}

// Clears the results from storage

function clearResults () {
     localStorage.setItem('quiz_game_correct', 0);
     localStorage.setItem('quiz_game_incorrect', 0);
     
     setTimeout(function() {
          window.location.reload();
     }, 500);
}