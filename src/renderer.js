const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');
const {
  getDefaultDirPath,
  handleDirOfSubs,
  writeSubToFile,
  handleFile,
  getFileName,
  processFile
} = require('./utils/fs-utils');
const {
  processSubtitle,
  main,
  makeContinuous,
  normalizeSubtitle,
  convertSubToSrt
} = require('./utils/ms-utils');

let dragSection = document.querySelector('#drag-section');
let dragContainer = document.querySelector('#drag-container');
const execute = document.querySelector('#execute');

let filePathForSub;
let outputPathForSub;

execute.addEventListener('click', async e => {
  if (dragContainer.classList.contains('ready')) {
    console.log('ITS READY');
    console.log(`filePathForSub: ${filePathForSub}`);
    outputPathForSub = path.dirname(filePathForSub);
    (async filePathForSub => {
      try {
        const file = await processFile(filePathForSub);
        const sub = await processSubtitle(file);
        const msFixed = await normalizeSubtitle(sub);
        console.log('msFixed: ', msFixed);
        const madeContinuous = await makeContinuous(msFixed);
        console.log(madeContinuous);
        const srt = await convertSubToSrt(madeContinuous);
        const fileInfo = await handleFile(filePathForSub);
        console.log('fileInfo', fileInfo);
        const writeIt = await writeSubToFile(fileInfo, srt);
        return `success!`;
      } catch (Error) {
        console.log(Error, 'FUCK');
      }
    })(filePathForSub);
  }

  alert(
    `Your updated file has been created here: ${outputPathForSub}`
  );
  dragContainer.classList.remove('ready');
});

/**
 * * DragOver Logic
 * * -Prevents Electron from showing the .srt when dragging in
 * * -Saves and updates filePathForSub variable on drag
 * TODO: Make drag take both directory and single subtitle
 */

document.addEventListener(
  'dragover',
  e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  },
  false
);

document.addEventListener('ondragstart', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('ondragleave', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('ondragend', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener(
  'drop',
  e => {
    e.preventDefault();
    filePathForSub = e.dataTransfer.files[0].path;
    console.log(filePathForSub);
    dragContainer.classList.add('ready');
    return false;
  },
  false
);
