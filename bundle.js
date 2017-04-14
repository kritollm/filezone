(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var index_1 = require("./index");
function handleFiles(files) {
    console.log(files);
}
index_1.fileZone(document.getElementById('filezone'), handleFiles);

},{"./index":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
