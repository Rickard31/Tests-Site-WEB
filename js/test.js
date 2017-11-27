var Templates = require('./templates');
var Tests = require('../info/test_list');

var $container = $("#questions");

const INTERVAL = 1;
function updateTimer() {
    var s = parseInt($("#seconds").text());
    var m = parseInt($("#minutes").text());

    var time = m * 60 + s;
    time += INTERVAL;

    $("#seconds").text(time % 60);
    time -= time % 60;
    $("#minutes").text(time / 60);
}

if ($("#timer").length != 0) var myVar = setInterval(updateTimer, INTERVAL * 1000);

//console.log($("#submit-test"));

$("#submit-test").click(function () {
    var children = $("#questions").children();
    //console.log(children);

    var max = children.length;
    var score = getScore(children);

    updateLocalStorage(score, max);
});

function updateLocalStorage(score, max) {
    var stats = localStorage.getItem("test stats");
    if (stats == null) {
        localStorage.setItem("test stats", JSON.stringify({
            quantity: 1,
            rate: score / max
        }))
    } else {
        var sum = JSON.parse(stats).quantity * JSON.parse(stats).rate;
        sum += score / max;
        localStorage.setItem("test stats", JSON.stringify({
            quantity: JSON.parse(stats).quantity + 1,
            rate: sum / (JSON.parse(stats).quantity + 1)
        }))
    }
    localStorage.setItem("last test", JSON.stringify({
        max: max,
        score: score,
        time: $("#timer").text().split('\n').join("")
    }))
}

function getScore(children) {
    var score = 0;
    for (var i = 0; i < children.length; i++) {
        var t = children[i];
        if (t.className === "single-choice-question") {
            var f = ($(t).find("form")).children("input");
            //console.log(f);
            var correct = true;
            for (var k = 0; k < f.length && correct; k++) {
                var $in = f[k];
                if (($in.value === "false" && $in.checked) || ($in.value === "true" && !$in.checked)) {
                    correct = false;
                }
            }
            if (correct) score++;
        } else {
            if (t.className === "multiple-choice-question") {
                var f = ($(t).find("form")).children("input");
                //console.log(f);
                var correct = true;
                for (var k = 0; k < f.length && correct; k++) {
                    var $in = f[k];
                    if (($in.value === "false" && $in.checked) || ($in.value === "true" && !$in.checked)) {
                        correct = false;
                    }
                }
                if (correct) score++;
            } else {
                if (t.className === "single-line-answer-question") {
                    var cor = $(t).find("input")[0].attributes[2].value;
                    var f = $($(t).find("input")[0]).val();
                    //console.log(cor, f);
                    if (cor.toLowerCase() === f.toLowerCase()) score++;
                }
            }
        }
    }
    return score;
}

function showQuestions(list) {
    $container.html("");

    function showOneQuestion(question) {

        var code;
        switch (question.type) {
            case "single-choice":
                code = Templates.single_choice({question: question});
                break;
            case "multiple-choice":
                code = Templates.multiple_choice({question: question});
                break;
            case "single-line":
                code = Templates.single_line({question: question});
                break;
            /*case "open-question":
                code = Templates.open_question({question: question});
                break;*/
            default:
                code = "";
                break;
        }

        var $html_code = $(code);
        $container.append($html_code);
    }

    list.forEach(showOneQuestion);
}

function showQuestionsOfTest() {
    showQuestions(JSON.parse(localStorage.getItem("current test")));
    //localStorage.removeItem("current test");
}

function getTestById(string) {
    //var i = "" + string;
    //var ID = i.substr(5);
    var res;
    Tests.forEach(function (t) {
        if (t.id === string) res = t;
    })
    return res;
}

//console.log(getTestById(1).questions);
//console.log(JSON.stringify(getTestById(1).questions));

exports.getTest = getTestById;
exports.initialiseQuestions = showQuestionsOfTest;



