

    var Test = require('./test');

    $(".test-link").click(function (link) {
        localStorage.removeItem("current test");
        console.log(link.currentTarget.getAttribute("id"));
        var test = Test.getTest(parseInt(link.currentTarget.getAttribute("id"))).questions;
        //console.log(test);
        localStorage.setItem("current test", JSON.stringify(test));
    });



    /*$(".test-link").click(function (link) {
        console.log("Click");
        testToLocalStorage(link.currentTarget.getAttribute("id"));
        console.log(link.currentTarget.getAttribute("id"));
    })*/



    /*function testToLocalStorage(testId) {
        var reqId = testId.substr(5);
        var test = getTest(reqId, Tests);
        localStorage.setItem("current test", test);

    }

    function getTest(paramId, list) {
        var res;
        list.forEach(function(){
            if(this.id===paramId) res=this;
        })
        return res;
    }*/






