const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const fs = require("fs");
const path = require("path");
const {
  getDefaultDirPath,
  getFileName,
  writeSubToFile,
  handleDirOfSubs,
  msNormalizer
} = require("./utils/ms-utils");

let dragSection = document.querySelector("#drag-section");
let dragContainer = document.querySelector("#drag-container");
