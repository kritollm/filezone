"use strict";
var index_1 = require("./index");
function handleFiles(files) {
    console.log(files);
}
index_1.fileZone(document.getElementById('filezone'), handleFiles);
