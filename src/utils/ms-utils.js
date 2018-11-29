const fs = require("fs");
const path = require("path");
const parser = require("subtitles-parser");

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
      let subtitleFileName = path.basename(filePath, ".srt");
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
  fs.writeFile(outputNameAndPath, subtitle, err => {
    if (err) return console.log(err);
  });
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

/**
 *
 * @param {string} filePath - accepts a string with a path to the subtitle
 * @return {array} - returns an array of objects displaying the subtitle contents
 */
const processSubtitle = filePath => {
  return new Promise((resolve, reject) => {
    if (filePath) {
      const srt = fs.readFileSync(filePath, "utf8");
      const parsedDirPath = path.dirname(filePath);
      const subtitleFileName = path.basename(filePath, ".srt");
      console.log(
        `msNormalizer says: \n` +
          `The subtitle ${subtitleFileName +
            ".srt"} is being processed at the following path: ${parsedDirPath}`
      );
      const outputNameAndPath = path.join(
        parsedDirPath,
        subtitleFileName + "_msUpdated.srt"
      );
      let sub = parser.fromSrt(srt);
      resolve(sub);
    } else {
      reject(Error);
    }
  });
};

/**
 * @param {string} filePath - accepts a string with a path to the subtitle
 * @return {string} sub - returns a subtitle file as well as a properly formatted srt
 */
const msNormalizer = async filePath => {
  try {
    const srt = fs.readFileSync(filePath, "utf8");

    const parsedDirPath = path.dirname(filePath);
    const subtitleFileName = path.basename(filePath, ".srt");
    console.log(
      `msNormalizer says: \n` +
        `The subtitle ${subtitleFileName +
          ".srt"} is being processed at the following path: ${parsedDirPath}`
    );
    const outputNameAndPath = path.join(
      parsedDirPath,
      subtitleFileName + "_msUpdated.srt"
    );

    let sub = parser.fromSrt(srt);

    for (let i = 0; i < sub.length; i++) {
      for (let j = i + 1; j <= i + 1; j++) {
        if (sub[j] === undefined) return;
        const msCheckAndUpdate = await (() => {
          //save substring of MS for both preceeding start and end times
          let iMS = sub[i].endTime.substr(9, 3);
          let iSS = sub[i].endTime.substr(6, 2);
          let jMS = sub[j].startTime.substr(9, 3);
          let jSS = sub[j].startTime.substr(6, 2);

          if (iMS > jMS && iSS === jSS) {
            // console.log(`iMS: ${iMS} should be the same as jMS: ${jMS}`);
            sub[j].startTime = sub[j].startTime.replace(/\d{3}/g, iMS);
          }
        })();
      }
      const updatedSrt = await parser.toSrt(sub);
      await writeSubToFile(outputNameAndPath, updatedSrt);
    }

    return sub;
  } catch (err) {
    if (err) throw err;
  }
};

module.exports = {
  getDefaultDirPath,
  getFileName,
  writeSubToFile,
  handleDirOfSubs,
  msNormalizer
};
