import { fileZone } from './index';

function handleFiles(files: FileList, e: DragEvent) {
    let target = <HTMLElement>e.target;
    console.log(files, target.id);
}

fileZone(document.getElementById('filezone'), handleFiles);
