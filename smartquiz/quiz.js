$(document).ready(function () {
    let currentQuestionIndex = 0;
    let score = 0;
    let isAnswerSelected = false;  // Flag to ensure only one selection

    const quizQuestions = [
        {
            question: "What is the capital of France?",
            type: "multiple-choice",
            options: ["Paris", "London", "Rome", "Berlin"],
            correctAnswer: "Paris"
          },
          {
            question: "Is the Earth flat?",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: "False"
          },
          {
            question: "Which element has the chemical symbol 'O'?",
            type: "multiple-choice",
            options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
            correctAnswer: "Oxygen"
          },
          {
            question: "What is the boiling point of water?",
            type: "multiple-choice",
            options: ["90°C", "100°C", "120°C", "110°C"],
            correctAnswer: "100°C"
          },
          {
            question: "What is the capital of Japan?",
            type: "input",
            correctAnswer: "Tokyo"
          },
          {
            question: "Which animal is known as the King of the Jungle?",
            type: "multiple-choice",
            options: ["Lion", "Elephant", "Tiger", "Giraffe"],
            correctAnswer: "Lion"
          },
          {
            question: "Who was the Ancient Greek God of the Sun?",
            type: "input",
            correctAnswer: "Apollo"
          },
          {
            question: "Who was the first president of the United States?",
            type: "multiple-choice",
            options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
            correctAnswer: "George Washington"
          },
          {
            question: "What is the smallest country in the world?",
            type: "multiple-choice",
            options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
            correctAnswer: "Vatican City"
          },
          {
            question: "Is Tokyo the capital of Japan?",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: "True"
          },
          {
            question: "Who painted the Mona Lisa?",
            type: "multiple-choice",
            options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
            correctAnswer: "Leonardo da Vinci"
          },
          {
            question: "Which country is known as the Land of the Rising Sun?",
            type: "multiple-choice",
            options: ["China", "South Korea", "India", "Japan"],
            correctAnswer: "Japan"
          },
          {
            question: "What is the longest river in the world?",
            type: "multiple-choice",
            options: ["Amazon River", "Nile River", "Yangtze River", "Ganges River"],
            correctAnswer: "Amazon River"
          },
          {
            question: "Fill in the blank: The currency of Japan is the ________.",
            type: "input",
            correctAnswer: "Yen"
          },
          {
            question: "Which country is home to the Great Barrier Reef?",
            type: "multiple-choice",
            options: ["USA", "Australia", "Canada", "Brazil"],
            correctAnswer: "Australia"
          },
        // More questions can go here...
    ];

    // Shuffle questions function
    function shuffleQuestions() {
        for (let i = quizQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]]; // Swap elements
        }
    }

    // Display current question
    function displayQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        $("#question").text(currentQuestion.question);
        $("#options-container").empty();
        isAnswerSelected = false;  // Reset flag for new question

        if (currentQuestion.type === "multiple-choice") {
            currentQuestion.options.forEach(function (option) {
                $("#options-container").append(`
                    <button class="option-btn">${option}</button>
                `);
            });
        } else if (currentQuestion.type === "true-false") {
            currentQuestion.options.forEach(function (option) {
                $("#options-container").append(`
                    <button class="true-false-btn">${option}</button>
                `);
            });
        } else if (currentQuestion.type === "input" || currentQuestion.type === "fill-in-the-blank") {
            $("#options-container").append(`
                <input type="text" id="user-input" placeholder="Enter your answer here" />
            `);
        }

        $("#feedback").empty();
    }

    // Evaluate answer and provide feedback
    function evaluateAnswer(selectedAnswer) {
        if (isAnswerSelected) return;  // Prevent evaluating again if already selected an answer

        const currentQuestion = quizQuestions[currentQuestionIndex];

        if (currentQuestion.type === "input" || currentQuestion.type === "fill-in-the-blank") {
            const userInput = $("#user-input").val().trim().toLowerCase(); // Normalize input
            const correctAnswer = currentQuestion.correctAnswer.toLowerCase(); // Normalize correct answer

            if (userInput === correctAnswer) {
                score++;
                $("#feedback").text("Well Done! Keep Going!").css("color", "teal").addClass('celebrate');
                $("#user-input").css("border", "2px solid green");
            } else {
                $("#feedback").text("Oops! Try Again!").css("color", "maroon");
                $("#user-input").css("border", "2px solid red");
            }
        } else {
            if (selectedAnswer === currentQuestion.correctAnswer) {
                score++;
                $("#feedback").text("Well Done! Keep Going!").css("color", "teal").addClass('celebrate');
                $(".option-btn").each(function () {
                    if ($(this).text() === selectedAnswer) {
                        $(this).addClass('correct');
                    }
                });
            } else {
                $("#feedback").text("Oops! Try Again!").css("color", "maroon");
                $(".option-btn").each(function () {
                    if ($(this).text() === selectedAnswer) {
                        $(this).addClass('incorrect');
                    }
                });
            }
        }
        isAnswerSelected = true;  // Lock the answer after selection
    }

    // Handle option button clicks
    $(document).on("click", ".option-btn", function () {
        const selectedAnswer = $(this).text();
        evaluateAnswer(selectedAnswer);
        $(".option-btn").prop("disabled", true);  // Disable buttons after answer is selected
    });

    // Handle True/False button clicks
    $(document).on("click", ".true-false-btn", function () {
        const selectedAnswer = $(this).text();
        evaluateAnswer(selectedAnswer);
        $(".true-false-btn").prop("disabled", true);  // Disable buttons after answer is selected
    });

    // Handle input field submit (when "Enter" is pressed)
    $(document).on("keypress", "#user-input", function (e) {
        if (e.which === 13) {  // "Enter" key
            const userAnswer = $(this).val().trim();
            if (userAnswer) {
                evaluateAnswer(userAnswer);
            }
        }
    });

    // Start quiz
    shuffleQuestions();
    displayQuestion();

    // Handle next button
    $("#next-btn").click(function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            $("#score-container").show();
            const percentage = (score / quizQuestions.length) * 100;
            let message = "";

            if (percentage < 10) {
                message = "You need to read more! And practice more! if not you'll never succeed! you failure!";
              } else if (percentage >= 10 && percentage < 30) {
                message = "Try harder!";
              }else if (percentage >= 40 && percentage < 50) {
                message = "Do better next time!";
              }else if (percentage >= 50 && percentage < 60) {
                message = "Good job!";
              } else if (percentage >= 60 && percentage < 70) {
                message = "Nice!";
              } else if (percentage >= 70 && percentage < 80) {
                message = "Great!";
              } else if (percentage >= 80 && percentage < 90) {
                message = "God-like!";
              } else if (percentage >= 90) {
                message = "Perfect! Legendary brain cells!";
              }

            $("#score-container").html(`
                Your score is <strong>${score}</strong> out of <strong>${quizQuestions.length}</strong>.<br>
                ${message}
            `);
            $("#next-btn").hide();
            $("#reset-btn").show();
        }
    });

    // Handle reset button
    $("#reset-btn").click(function () {
        score = 0;
        currentQuestionIndex = 0;
        $("#score-container").hide();
        $("#next-btn").show();
        displayQuestion();
        $(".option-btn, .true-false-btn").prop("disabled", false);  // Enable buttons for next quiz
    });
});
