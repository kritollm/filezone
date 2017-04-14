function prevent(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
}

function fastClick(element: HTMLElement, fn: (e?) => void) {
    let lastClicked = 0;
    let touchFired = false;
    function listener(e: Event) {
        let eventTime = Date.now();
        e.preventDefault();
        e.stopPropagation();
        touchFired = e.type == 'touchstart';
        let clickFired = e.type == 'click';
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

let listenerAdded = false;
function listenDocument() {
    if (!listenerAdded) {
        document.addEventListener("drop", prevent, false);
        document.addEventListener("dragenter", prevent, false);
        document.addEventListener("dragover", prevent, false);
        listenerAdded = true;
    }
}

function fileZone(el: HTMLElement, cb: (files: FileList) => void) {
    listenDocument();
    el.addEventListener("dragenter", prevent, false);
    el.addEventListener("dragover", prevent, false);
    el.addEventListener("drop", (e: DragEvent) => {
        prevent(e);
        var dt = e.dataTransfer;
        var files = e.dataTransfer && e.dataTransfer.files;
        cb(files);
    }, false);

    let fileInput = document.createElement('input');
    fileInput.style.display = 'none';
    fileInput.type = 'file';
    fileInput.addEventListener('change', (e) => {
        cb(fileInput.files);
    }, false);
    fastClick(el, () => fileInput.click());
}

export { fileZone };