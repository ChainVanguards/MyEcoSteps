var points = 0;
var currentQuestion = 0;

function selectChoice(choicePoints) {
    points += choicePoints;
    document.getElementById("points").innerHTML = points;
    currentQuestion++;
    nextQuestion();
}

function nextQuestion() {
    var questionDivs = document.getElementsByClassName("question");
    for (var i = 0; i < questionDivs.length; i++) {
        questionDivs[i].style.display = "none";
    }
    if (currentQuestion == questionDivs.length) {
        showResult();
    } else {
        var nextQuestionDiv = document.getElementsByClassName("question")[currentQuestion];
        nextQuestionDiv.style.display = "block";
    }


}

function showResult() {
    var containerDiv = document.getElementsByClassName("container")[0];
    containerDiv.innerHTML = "<p>Your water footprint is around " + points + " gallons/day.</p><br>The average water footprint for an individual in the US is 1,802 gallons/day.";

    var abcDiv = document.getElementsByClassName("abc")[0];
    abcDiv.classList.add("show-abc");
}

function showResult() {
    var surveyResultPoints = points * 1000;
    var containerDiv = document.getElementsByClassName("container")[0];
    containerDiv.innerHTML = "<p>Your water footprint is around " + points + " gallons/day.</p><br>The average water footprint for an individual in the US is 1,802 gallons/day.";

    var abcDiv = document.getElementsByClassName("abc")[0];
    abcDiv.classList.add("show-abc");

    var EDUAmountInput = document.getElementById("EDUAmountInput");
    EDUAmountInput.value = surveyResultPoints;
}