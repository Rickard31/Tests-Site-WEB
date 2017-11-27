var Templates = require('./templates');
var Tests = require('../info/test_list');

var $container = $("#test-list");
var CurrentList;

$("#do_search_button").click(function () {
    var temp = [];
    CurrentList.forEach(function(t){
        if(t.name.toLowerCase().includes($("#search-input").val().toLowerCase()) || t.description.toLowerCase().includes($("#search-input").val().toLowerCase())) temp.push(t);
    })
    $("#search-input").val("");
    showTestList(temp);
})

$("#search-input").keyup(function () {
    console.log("Change");
    var temp = [];
    CurrentList.forEach(function(t){
        if(t.name.toLowerCase().includes($("#search-input").val().toLowerCase()) || t.description.toLowerCase().includes($("#search-input").val().toLowerCase())) temp.push(t);
    });
    showTestList(temp);
})

function showTestList(list) {
    $container.html("");

    function showOneTest(test) {
        var code = Templates.testPreview({test: test});
        var $node = $(code);
        $container.append($node);
    }

    list.forEach(showOneTest);
}

function initialiseList() {
    showTestList(Tests);
    CurrentList = Tests;
}

function initialiseTree() {
    //$("#tree").html("");
    var categories = [];
    Tests.forEach(function (t) {
        if (!categories.includes(t.category)) categories.push(t.category);
    });

    categories.forEach(function (t) {
        //var cats = ["cat 1", "subcat"];
        var cats = t.split("/");
        var $parent = $("#tree ul #" + encrypt(cats[0]));
        //console.log($parent);
        if ($parent.length == 0) {
            $("#all_categories").append($("<ul><li id='" + encrypt(cats[0]) + "'>" + cats[0] + "</li></ul>"));
            $parent = $("#tree ul #" + encrypt(cats[0]));
        }
        console.log($parent);
        for (var i = 1; i < cats.length; i++) {
            var $temp = $parent.find("#" + encrypt(cats[i]));
            if ($temp.length == 0) {
                $parent.append($("<ul><li id='" + encrypt(cats[i]) + "'>" + cats[i] + "</li></ul>"));
                $temp = $parent.find("#" + encrypt(cats[i]));
            }
            $parent = $temp;
            console.log($parent);
        }

        //console.log($parent);
        //console.log($("#tree ul").html());
    });
    //console.log($("#cat1"));
    //console.log($("#subcat").parent().parent().attr("id"));
    //console.log(getCategoryPath($("#subcat")));
    //console.log(getCategoryPath($("#subcat")));

    $('#tree')
    // listen for event
        .on('changed.jstree', function (e, data) {
            /*var i, j, r = [];
            for(i = 0, j = data.selected.length; i < j; i++) {
                //r.push(data.instance.get_node(data.selected[i]).text);
                console.log(getCategoryPath($("#tree").jstree().get_selected(true)[0]));
                console.log($("#tree").jstree().get_selected(true)[0]);
            }*/
            //console.log('get',$("#tree").jstree().get_selected(true)[0].id);
            var categoryCurrent = getCategoryPath($("#tree").jstree().get_selected(true)[0]);
            //console.log(categoryCurrent);
            //console.log(getCategoryPath($("#tree").jstree().get_selected(true)[0]));
            if($("#tree").jstree().get_selected(true)[0].id==="all_categories")initialiseList();
            else initialiseListByCategory(categoryCurrent);
            //console.log($("#tree").jstree().get_selected(true)[0]);
            //$('#event_result').html('Selected: ' + r.join(', '));
            //if(r[0].includes(""))
            //console.log($("#"+r[0]).attr("id"));
        })
        // create the instance
        .jstree();

    return categories;
}

function getCategoryPath($node) {
    /*var $temp = $node;
    var res = decrypt($temp.id);
    while($temp.parent().parent().attr("id")!=="all_categories"){
        //$temp = $temp.parent().parent();
        $temp = $temp.parent;
        res = decrypt($temp.id) + "/" + res;
    }
    return res;*/
    var par = $node.parents;
    var res = "";
    for (var i = par.length - 3; i >= 0; i--) {
        res += decrypt(par[i]) + "/";
    }
    res += decrypt($node.id);
    return res;
}

function initialiseListByCategory(category) {
    var res = [];
    if (category === ' ') {
        Tests.forEach(function (t) {
            res.push(t);
        });
    }
    else
        Tests.forEach(function (t) {
            //console.log(t.category);
            if (t.category.includes(category)) res.push(t);
        });
    showTestList(res);
    CurrentList = res;
}

function encrypt(string) {
    if(string==='all_categories') return 'all_categories';
    var res = "";
    for (var i = 0; i < string.length; i++) {
        res += string.charCodeAt(i) + "_";
    }
    return res;
}

function decrypt(string) {
    if (string.id === 'all_categories') return "";
    var arr = string.split("_");
    var res = "";
    arr.forEach(function (t) {
        res += String.fromCharCode(parseInt(t));
    })
    return res.substring(0, res.length - 1);
}

exports.initialiseList = initialiseList;
exports.initialiseListWithFilter = initialiseListByCategory;
exports.initTree = initialiseTree;

console.log(encrypt("abc d"));
console.log(decrypt(encrypt("abc d")));