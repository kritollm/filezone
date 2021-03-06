"use strict";
function prevent(e) {
    e.stopPropagation();
    e.preventDefault();
}
function fastClick(element, fn) {
    var lastClicked = 0;
    var touchFired = false;
    function listener(e) {
        var eventTime = Date.now();
        e.preventDefault();
        e.stopPropagation();
        touchFired = e.type == 'touchstart';
        var clickFired = e.type == 'click';
        if (clickFired && touchFired) {
            touchFired = false;
            return;
        }
        if ((eventTime - lastClicked) < 250) {
            return;
        }
        fn();
        touchFired = false;
        lastClicked = eventTime;
    }
    element.addEventListener('touchstart', listener, false);
    element.addEventListener('click', listener, false);
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
        cb(files);
    }, false);
    var fileInput = document.createElement('input');
    fileInput.style.display = 'none';
    fileInput.type = 'file';
    fileInput.addEventListener('change', function (e) {
        cb(fileInput.files);
    }, false);
    fastClick(el, function () { return fileInput.click(); });
}
exports.fileZone = fileZone;
