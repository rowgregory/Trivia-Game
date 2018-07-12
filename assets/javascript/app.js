$(document).ready(function() {

// // will put questions into in this question array
var triviaQuestions = [{
    question: "What is Charlie's brother called?",
    answerList: ["Zack", "Simon", "Liam", "Tommy"],
    answer: 2
},{   
    question: "What is Claire's surname?",
    answerList: ["Ford", "Reyes", "Carlyle", "Littleton"],
    answer: 3
},{
    question: "Who of the following does NOT die in the first season?",
    answerList: ["Ethan", "Boone", "Charlie", "Shannon"],
    answer: 2
},{
    question: "Which survivor had won the lottery?",
    answerList: ["Hurley", "Sawyer", "Sun", "Locke"],
    answer: 0
},{
    question: "Who burned Michael's original raft?",
    answerList: ["Locke", "Jin", "Sawyer"," Walt"],
    answer: 3
},{
    question: "What is Sawyers real name?",
    answerList: ["James Ford", "Ethan Rom", "Hugo Reyes", "James Matthews"],
    answer: 0
},{
    question: "Who was in the hatch?",
    answerList: ["Walt", "Desmond", "The survivors from the tail-section of the plane", "No one"],
    answer: 1
},{
    question: "How often do the numbers have to be typed into the computer?",
    answerList: ["Every 108 minutes", "Every 126 minutes", "Every 80 minutes", "Once a week"],
    answer: 0
},{
    question: "What is the name the Dharma corporation gave to the 'hatch'?",
    answerList: ["The Sparrow", "The Swan", "The Sapling", "The Star"],
    answer: 1
},{
    question: "Who is the first survivor to go into the hatch?",
    answerList: ["Locke", "Jack", "Kate", "Hurley"],
    answer: 0
}];


var currentQuestion;
var questionCounter;
var correctAnswer;
var incorrectAnswer;
var unanswered;

var time;
var seconds = 5;

var answered;
var userSelect;
var messages = {
correct: "Don't tell me what I can't do.",
incorrect: "It's never been easy!",
endTime: "See you in another life, brother.",
finished: "If we can't live together, were going to die alone."
}

var interval;
var count = 0;
// var gameHTML;
var openScreen;
// var theClock;
var clickSound = new Audio();

var timer;
// var timeToGuess;
// var library;
// var questionLength = 30;        // seconds you have to guess
// var answerLength = 3;           // seconds the user is shown the answer
// var gameLength;                 // set this to limit the number of questions per game


    function openingPage() {
        // display opening page
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-success start-button' href='#' role='button'>Start</a></p>";
            
        $("#_directionText").html('This is how you play');
        $("#mainArea").append(openScreen);
    }

    openingPage();

        
    $("#mainArea").on("click", ".start-button", function(event){
        // clickSound.play();
        $('.jumbotron').hide();
            newGame();
        });

    //var randomQ = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];

    function newGame() {
        $("#_finalMessage").empty();
        $("#_correctAnswers").empty();
        $("#_incorrectAnswers").empty();
        $("#_unanswered").empty();
        
        // reset game variables
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        

        newQuestion();
    }
    
    function newQuestion(){
        
        
        $("#_message").empty();
        $("#_correctedAnswer").empty();
        $("#_gif").empty();
        answered = true;

        $('#_currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
        $("#_questionText").html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
        // // creates 4 divs
        for(var i = 0; i < 4; i++){
            var choices = $('<div>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({'data-index': i });
            choices.addClass('thisChoice');
            $('._answerList').append(choices);
        }

        timeWrapper();        
        // clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function(){
            userSelect = $(this).data('index');
            clearInterval(timer);
            answerPage();
            resetTimer();
        });             
    }

    function timeWrapper() {
        timer = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (seconds === 0){
                clearInterval(timer);
                //timeOutLoss();
                //answered = false;
                for(var i = 1; i < triviaQuestions.length; i++){
                triviaQuestions[currentQuestion].question[i];
                }
            }
            if (seconds > 0) {
                seconds--;
                //answered = true;
            }
            $("#timer").html(seconds + " seconds left");
        }
    }

    function resetTimer() {
        clearInterval(timer);
        $("#timer").empty();
        seconds = 15;
    }
  
    // function timeOutLoss() {
    //     unanswered++;
    //     setTimeout(3000);
        
    // }

    function answerPage() {
        $('#_currentQuestion').empty();
	    $('.thisChoice').empty(); //Clears question page
	    $('#_questionText').empty();
        
        
        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#_message').html(messages.correct);
        } else if((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
            $('#_message').html(messages.incorrect);
            $('#_correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else{
            unanswered++;
            $('#_message').html(messages.endTime);
            $('#_correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            //answered = false;
            
        }

        if(currentQuestion == (triviaQuestions.length-1)){
            setTimeout(scoreboard, 3000)
        } else{
            currentQuestion++;
            setTimeout(newQuestion, 3000);
        }
    }

    function scoreboard(){
        $('#_timeRemaining').empty();
        $('#_message').empty();
        $('#_correctedAnswer').empty();
        //$('#gif').empty();
    
        $('#_finalMessage').html(messages.finished);
        $('#_correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#_incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#_unanswered').html("Unanswered: " + endTime);
        $('#_startOverBtn').addClass('reset');
        $('#_startOverBtn').show();
        $('#_startOverBtn').html('Start Over?');
    }

});





                


// $("#startBtn").on("click", function(){
//     $(this).hide();   
// });

// $("#_startOverBtn").on("click", function(){
//     $(this).hide();   
// });


























// user clicks start button which brings us to the game

// user than has to answer a question within 30 seconds

// user has 4 answer options

// if user clicks correct answer, increment correctAnswers

// if user clicks incorrect answer, increment incorrectAnswers

// if user doesn't click an answer, incrememt unanswered 

// timer resets to 30 seconds each answer

// once questions are finished, show stats


