$(document).ready(function() {
    

// // will put questions into in this question array
    var triviaQuestions = [{
        question: "What is Shannon's brothers name?",
        answerList: ["Zack", "Simon", "Boone", "Tommy"],
        answer: 2,
        image: "assets/images/boone_giphy.gif",
    },{   
        question: "What is Claire's surname?",
        answerList: ["Ford", "Reyes", "Carlyle", "Littleton"],
        answer: 3,
        image: "assets/images/claire_giphy.gif"
    },{
        question: "Who of the following does NOT die in the first season?",
        answerList: ["Ethan", "Boone", "Charlie", "Shannon"],
        answer: 2,
        image: "assets/images/season1.gif",
    },{
        question: "Which survivor had won the lottery?",
        answerList: ["Hurley", "Sawyer", "Sun", "Locke"],
        answer: 0,
        image: "assets/images/lottery.gif",
    },{
        question: "Who burned Michael's original raft?",
        answerList: ["Locke", "Jin", "Sawyer"," Walt"],
        answer: 3,
        image: "assets/images/raft_giphy.gif",
    },{
        question: "What is Sawyers real name?",
        answerList: ["James Ford", "Ethan Rom", "Hugo Reyes", "James Matthews"],
        answer: 0,
        image: "assets/images/jamesFord.gif",
    },{
        question: "Who was in the hatch?",
        answerList: ["Walt", "Desmond", "Ben", "No one"],
        answer: 1,
        image: "assets/images/whoWasInTheHatch.gif",
    },{
        question: "How often do the numbers have to be typed into the computer?",
        answerList: ["Every 108 minutes", "Every 126 minutes", "Every 80 minutes", "Once a week"],
        answer: 0,
        image: "assets/images/108Mins.gif",
    },{
        question: "What is the name the Dharma corporation gave to the 'hatch'?",
        answerList: ["The Sparrow", "The Swan", "The Sapling", "The Star"],
        answer: 1,
        image: "assets/images/dharma_giphy.gif",
    },{
        question: "Who is the first survivor to go into the hatch?",
        answerList: ["Locke", "Jack", "Kate", "Hurley"],
        answer: 0,
        image: "assets/images/hatch.gif",
    }];

    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var unanswered;
    var answered;

    var timer;
    var seconds;

    var openScreen;

    var userSelect;
    var messages = {correct: {
        text: "Don't tell me what I can't do!",
        image: "assets/images/correstMessageLost.gif",
        },incorrect: {
        text: "It's never been easy!",
        image: "assets/images/incorrectMessageLost.gif",
        }, endTime: {
        text: "See you in another life, brother!",
        image: "assets/images/unansweredMessageLost.gif",
        }, finished: {
        text: "If we can't live together, were going to die alone!",
        image: "assets/images/finishedMessageLost.gif",
        }}

        
        function begin() {
            $('.jumbotron').addClass('animated zoomInDown');      
        }
        
        begin();
           
        $('#mainArea').hide();

        function delayedAnimation() {       
            $('#_directionText').addClass('animated rubberBand');
            
        }
        setTimeout(delayedAnimation, 1000);

        function secondDelay() {
            $('#mainArea').show();
            $('#mainArea').addClass('animated fadeInDownBig'); 
        }
        setTimeout(secondDelay, 1500);

        function pulseDelay() {
            $('.jumboWrapper').addClass('animated infinite pulse yeah');
        }
        setTimeout(pulseDelay, 3000);

        function openingPage() {
            // display opening page
            openScreen = "<p class='text-center main-button-container'><a class='btn btn-lg start-button text-center' href='#' role='button'>Start</a></p>";
                
            $("#_directionText").html('LOST trivia');
            $("#mainArea").append(openScreen); 
            
        }
        
        openingPage();
        

    // start button
        $("#mainArea").on("click", ".start-button", function(event){
            var audio = $("#mysoundclip")[0]
            audio.play();
            
            $('.jumbotron').hide();
            newGame();
        });

        
        function newGame() {
            
            // removes content from elements
            $("#_finalMessage").empty();
            $("#_correctAnswers").empty();
            $("#_incorrectAnswers").empty();
            $("#_unanswered").empty();
            $('#container').show();
            $('#_message').hide();

            // reset game variables
            currentQuestion = 0;
            correctAnswer = 0;
            incorrectAnswer = 0;
            unanswered = 0;
            
            // new question function 
            newQuestion();   
        }
        
        function newQuestion(){
            // empties elements

            $("._answerList").empty();
            $("#_message").empty();
            $("#_correctedAnswer").empty();
            $('#_correctedAnswer').hide();
            $('#_correctCorrect').hide();
            $("#blankImage").show();
            $('#displayBox').hide();
            $('#_message').hide();
            answered = true;
            
            // DOM manipulation 
            $('#_currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
            $("#_questionText").html('<div>' + triviaQuestions[currentQuestion].question + '</div>');
            // $("#blankImage").attr("src", triviaQuestions[currentQuestion].image);

            if (triviaQuestions[currentQuestion].image) {
                $("#blankImage").attr("src", triviaQuestions[currentQuestion].image);
            } else {
                $("#blankImage").attr("src", "assets/images/castPic.jpg");
            }

            // // creates 4 divs
            for(var i = 0; i < 4; i++){
                var choices = $('<div>');
                choices.text(triviaQuestions[currentQuestion].answerList[i]);
                choices.attr({'data-index': i });
                choices.attr({'id':'animate'});
                choices.addClass('thisChoice animated rotateInDownLeft');
                $('._answerList').append(choices);
            }
            // countdown function fired
            countDown();   
            
            $('.thisChoice').on('click', function(){
                
                userSelect = $(this).data('index');
                clearInterval(timer);
                answerPage();
                $("#container").addClass('animated zoomInUp');
                $('#container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $('#container').removeClass('animated zoomInUp');
                    
                });
                document.getElementById("click").play();
            });    
        }
        
        function countDown() {
            // start at 15 seconds
            seconds = 15;
            $("#timer").html(seconds);
            $("#timer").addClass('animated infinite pulse');
            answered = true;
            // sets time to go down
            timer = setInterval(fifteenSeconds, 1000);
        }

        function fifteenSeconds() {
            // decrement seconds
            seconds--;
            $("#timer").html(seconds);
                                        
            if (seconds <= 0) {
                clearInterval(timer);
                    answered = false;
                    answerPage();        
            }             
        } 

        function answerPage() {
            
            $('#_message').show();
            $('#_currentQuestion').empty();
            $('._answerList').empty(); //Clears question page
            $('#_questionText').empty();
            
            var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
            var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
            // checks if correct
            if ((userSelect == rightAnswerIndex) && (answered == true)) {
                correctAnswer++;
                $('#_correctCorrect').html('Correct! The answer was: ' + rightAnswerText);
                $('#_correctCorrect').show();
                $('#blankImage').show();
                $('#_message').html(messages.correct.text);
                $('#blankImage').attr("src", messages.correct.image);
            // checks if incorrect
            } else if((userSelect != rightAnswerIndex) && (answered == true)){
                incorrectAnswer++;
                $('#_message').html(messages.incorrect.text);
                $('#_correctedAnswer').html('Wrong! The correct answer was: ' + rightAnswerText);
                $('#blankImage').attr("src", messages.incorrect.image);
                $('#_correctedAnswer').show();
            // checks if unanswered
            } else{
                unanswered++;
                $('#_message').html(messages.endTime.text);
                $('#_correctedAnswer').html('Are you still there? The correct answer was: ' + rightAnswerText);
                $('#_correctedAnswer').show();
                $('#blankImage').attr("src", messages.endTime.image);
                answered = true;       
            }

            if(currentQuestion == (triviaQuestions.length-1)){
                setTimeout(scoreboard, 3000);
                
                
            } else{
                currentQuestion++;
                setTimeout(newQuestion, 5000);    
            }
        }

        function scoreboard(){
            
            
            $('#_message').hide();
            $('#_correctedAnswer').empty();
            $('#_correctedAnswer').hide();
            $('#_correctCorrect').hide();
            $('#_fraction').show(); 
            $('#displayBox').show();
        
            $('#blankImage').attr("src", messages.finished.image);
            $('#_finalMessage').html(messages.finished.text);
            $('#_correctAnswers').html("Correct Answers: " + correctAnswer);
            $('#_incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
            $('#_unanswered').html("Unanswered: " + unanswered);
            $('#_fraction').html("Score: " + correctAnswer + '/' + triviaQuestions.length);
            $('#_startOverBtn').addClass('reset');
            $('#_startOverBtn').show();
            $('#_startOverBtn').html('Start Over');
            $('#_startOverBtn').addClass('animated swing');
            $('#_fraction').addClass('animated fadeInDown');
            $('#_correctAnswers').addClass('animated fadeInDown');

            document.getElementById("bells").play();
        }

        $("#_startOverBtn").on("click", function(){
            
            $("#_startOverBtn").addClass('animated flipOutY');
            $('#_startOverBtn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('#_startOverBtn').removeClass('animated flipOutY');
                newGame();
                $('#_startOverBtn').hide();  
                
                document.getElementById("swoosh").play();
            });
        });       
});




























// user clicks start button which brings us to the game

// user than has to answer a question within 30 seconds

// user has 4 answer options

// if user clicks correct answer, increment correctAnswers

// if user clicks incorrect answer, increment incorrectAnswers

// if user doesn't click an answer, incrememt unanswered 

// timer resets to 30 seconds each answer

// once questions are finished, show stats


