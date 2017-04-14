# filezone

Turn an element into a drop zone, and open file picker on click.
Prevent drop on document.

Work in progress, one piece in an easy to use drop, crop, upload system.

```javascript
function handleFiles(files: FileList) {
    console.log(files);
}

fileZone(document.getElementById('filezone'), handleFiles);
```

```html
<div id="filezone">Drop file, or click to select</div>
```