const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');
const {
  getDefaultDirPath,
  getFileName,
  writeSubToFile,
  handleDirOfSubs,
  msNormalizer
} = require('./utils/ms-utils');

let dragSection = document.querySelector('#drag-section');
let dragContainer = document.querySelector('#drag-container');

let filePathForSub;
let dir;

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
    // getDefaultDirPath(filePathForSub);
    // subtitleFileName = path.basename(filePathForSub, '.srt');
    // console.log(
    //   `FilePathForSub${filePathForSub} \n subtitleFileName:${subtitleFileName}\ndefaultDirPath: ${defaultDirPath}`
    // );
    // execute.classList.add('ready');
    return false;
  },
  false
);
