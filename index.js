"use strict";
function prevent(e) {
    e.stopPropagation();
    e.preventDefault();
}
var listenerAdded = false;
function listenDocument() {
    if (!listenerAdded) {
        document.addEventListener("drop", prevent, false);
        document.addEventListener("dragenter", prevent, false);
        document.addEventListener("dragover", prevent, false);
        listenerAdded = true;
    }
}
function fileZone(el, cb) {
    listenDocument();
    el.addEventListener("dragenter", prevent, false);
    el.addEventListener("dragover", prevent, false);
    el.addEventListener("drop", function (e) {
        prevent(e);
        var dt = e.dataTransfer;
        var files = e.dataTransfer && e.dataTransfer.files;
        cb(files, e);
    }, false);
}
exports.fileZone = fileZone;
