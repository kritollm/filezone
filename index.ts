function prevent(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
}

let listenerAdded = false;
function listenDocument() {
    if (!listenerAdded) {
        document.addEventListener("drop", prevent, false);
        document.addEventListener("dragenter", prevent, false);
        document.addEventListener("dragover", prevent, false);
        listenerAdded = true;
    }
}

function fileZone(el: HTMLElement, cb: (files: FileList, e: DragEvent) => void) {
    listenDocument();
    el.addEventListener("dragenter", prevent, false);
    el.addEventListener("dragover", prevent, false);
    el.addEventListener("drop", (e: DragEvent) => {
        prevent(e);
        var dt = e.dataTransfer;
        var files = e.dataTransfer && e.dataTransfer.files;
        cb(files, e);
    }, false);
}

export { fileZone };