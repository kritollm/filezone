import { fileZone } from './index';

function handleFiles(files: FileList) {
    console.log(files);
}

fileZone(document.getElementById('filezone'), handleFiles);
