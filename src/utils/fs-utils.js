const fs = require('fs');
const path = require('path');
const { processSubtitle } = require('./ms-utils');

/**
 *
 * @param {string} filePath - path to srt file
 */
const processFile = filePath => {
  return new Promise((resolve, reject) => {
    if (filePath) {
      const srt = fs.readFileSync(filePath, 'utf-8');
      resolve(srt);
    } else {
      reject(Error);
    }
  });
};

/**
 *
 * @param {string} filePath - Takes a filePath to parse
 * @return {string} parsedDirPath - Returns the path without file and extension
 */
const getDefaultDirPath = filePath => {
  return new Promise((resolve, reject) => {
    if (filePath) {
      let parsedDirPath = path.dirname(filePath);
      defaultDirPath = parsedDirPath;
      resolve(parsedDirPath);
    } else {
      reject(Error);
    }
  });
};

/**
 *
 * @param {string} filePath - Takes a path as a string to parse
 * @return {string} subtitleFileName - Returns only the filename, removing path and file extension
 */
const getFileName = filePath => {
  return new Promise((resolve, reject) => {
    if (filePath) {
      let subtitleFileName = path.basename(filePath, '.srt');
      resolve(subtitleFileName);
    } else {
      reject(Error);
    }
  });
};

/**
 *
 * @param {string} outputNameAndPath - Path and Name of output
 * @param {object} subtitle - Object consisting of updated subtitle file
 */
const writeSubToFile = (outputNameAndPath, subtitle) => {
  return new Promise((resolve, reject) => {
    if (outputNameAndPath && subtitle) {
      resolve(
        fs.writeFile(outputNameAndPath, subtitle, err => {
          if (err) return console.log(err);
        })
      );
    } else {
      reject(Error);
    }
  });
};

const handleFile = async filePath => {
  console.log('filePath: ', filePath);
  let fileName = await getFileName(filePath);
  const dirPath = await getDefaultDirPath(filePath);
  console.log('dirPath: ', dirPath);
  const outputNameAndPath = await path.join(
    dirPath,
    fileName + '_msUpdate.srt'
  );
  return await outputNameAndPath;
};

/**
 *
 * @param {string} inputPath - Path to directory of srts
 */
const handleDirOfSubs = inputPath => {
  const dirArr = fs.readdirSync(inputPath);
  const dirPath = inputPath;
  dirArr.forEach(file => {
    let filePath = path.join(dirPath, file);
    msNormalizer(filePath);
  });
  return dirArr;
};

module.exports = {
  getDefaultDirPath,
  handleDirOfSubs,
  writeSubToFile,
  getFileName,
  processFile,
  handleFile
};
