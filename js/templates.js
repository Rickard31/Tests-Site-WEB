var fs = require('fs');
var ejs = require('ejs');

exports.testPreview = ejs.compile(fs.readFileSync('templates/testPreview.ejs', "utf8"));

exports.single_choice = ejs.compile(fs.readFileSync("templates/single-choice-question.ejs", "utf8"));
exports.multiple_choice = ejs.compile(fs.readFileSync("templates/multiple-choice-question.ejs", "utf8"));
exports.single_line = ejs.compile(fs.readFileSync("templates/single-line.ejs", "utf8"));
exports.open_question = ejs.compile(fs.readFileSync("templates/open-question.ejs", "utf8"));