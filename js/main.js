$(function () {

    //console.log("ab c de".split(' ').join('@'));
    var TestList = require('./testList');
    //TestList.initialiseListWithFilter("Category1");
    TestList.initialiseList();
    TestList.initTree();
    //console.log(TestList.initTree());

    var Index = require('./index');

    //if ($("#questions").length == 1) {
        var Test = require('./test');
        Test.initialiseQuestions();
    //}

//$("#tree").jstree();
})