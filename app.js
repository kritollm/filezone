"use strict";
var index_1 = require("./index");
function handleFiles(files, e) {
    var target = e.target;
    console.log(files, target.id);
}
index_1.fileZone(document.getElementById('filezone'), handleFiles);
