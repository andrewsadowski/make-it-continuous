const fs = require("fs");
const path = require("path");
const parser = require("subtitles-parser");
const {
  getDefaultDirPath,
  handleDirOfSubs,
  writeSubToFile,
  getFileName,
  processFile
} = require("./fs-utils");

/**
 *
 * @param {string} filePath - accepts a string with a path to the subtitle
 * @return {array} - returns an array of objects displaying the subtitle contents
 */
const processSubtitle = processedFile => {
  return new Promise((resolve, reject) => {
    if (processedFile) {
      let sub = parser.fromSrt(processedFile);
      resolve(sub);
    } else {
      reject(Error);
    }
  });
};

/**
 *
 * @param {array} sub - Parsed subtitle ready for processing
 */
const normalizeSubtitle = sub => {
  return new Promise((resolve, reject) => {
    if (sub && typeof sub === "array") {
      for (let i = 0; i < sub.length; i++) {
        for (let j = i + 1; j <= i + 1; j++) {
          if (sub[j] === undefined) return;
          const msCheckAndUpdate = () => {
            //save substring of MS for both preceeding start and end times
            let iMS = sub[i].endTime.substr(9, 3);
            let iSS = sub[i].endTime.substr(6, 2);
            let jMS = sub[j].startTime.substr(9, 3);
            let jSS = sub[j].startTime.substr(6, 2);

            if (iMS > jMS && iSS === jSS) {
              // console.log(`iMS: ${iMS} should be the same as jMS: ${jMS}`);
              sub[j].startTime = sub[j].startTime.replace(/\d{3}/g, iMS);
            }
          };
        }
        const updatedSub = sub;
        resolve(updatedSub);
        // const updatedSrt = await parser.toSrt(sub);
        // await writeSubToFile(outputNameAndPath, updatedSrt);
      }
    } else {
      reject(Error);
    }
  });
};

/**
 *
 * @param {array} normalizedSub - array of sub objs that have been normalized
 */
const makeContinuous = normalizedSub => {
  let sub = normalizedSub;
  return new Promise((resolve, reject) => {
    if (typeof sub === "array") {
      for (let j = i + 1; j <= i + 1; j++) {
        if (sub[j] === undefined) return;
        const msCheckAndUpdate = () => {
          //save substring of MS for both preceeding start and end times
          let iMS = sub[i].endTime.substr(9, 3);
          let iSS = sub[i].endTime.substr(6, 2);
          let jMS = sub[j].startTime.substr(9, 3);
          let jSS = sub[j].startTime.substr(6, 2);

          if (iMS > jMS && iSS === jSS) {
            // console.log(`iMS: ${iMS} should be the same as jMS: ${jMS}`);
            sub[j].startTime = sub[j].startTime.replace(/\d{3}/g, iMS);
          }
        };
      }
      const updatedSub = sub;
      resolve(updatedSub);
    }
  });
};

const main = async () => {
  try {
    let file = await processFile("test.srt");
    let sub = await processSubtitle(file);
    console.log(sub);
    return sub;
  } catch (Error) {
    console.log(Error);
  }
};

// main();

module.exports = {
  processSubtitle,
  normalizeSubtitle
};

// /**
//  * @param {string} filePath - accepts a string with a path to the subtitle
//  * @return {string} sub - returns a subtitle file as well as a properly formatted srt
//  */
// const msNormalizer = async filePath => {
//   try {
//     const srt = fs.readFileSync(filePath, 'utf8');

//     const parsedDirPath = path.dirname(filePath);
//     const subtitleFileName = path.basename(filePath, '.srt');
//     console.log(
//       `msNormalizer says: \n` +
//         `The subtitle ${subtitleFileName +
//           '.srt'} is being processed at the following path: ${parsedDirPath}`
//     );
//     const outputNameAndPath = path.join(
//       parsedDirPath,
//       subtitleFileName + '_msUpdated.srt'
//     );

//     let sub = parser.fromSrt(srt);

//     for (let i = 0; i < sub.length; i++) {
//       for (let j = i + 1; j <= i + 1; j++) {
//         if (sub[j] === undefined) return;
//         const msCheckAndUpdate = await (() => {
//           //save substring of MS for both preceeding start and end times
//           let iMS = sub[i].endTime.substr(9, 3);
//           let iSS = sub[i].endTime.substr(6, 2);
//           let jMS = sub[j].startTime.substr(9, 3);
//           let jSS = sub[j].startTime.substr(6, 2);

//           if (iMS > jMS && iSS === jSS) {
//             // console.log(`iMS: ${iMS} should be the same as jMS: ${jMS}`);
//             sub[j].startTime = sub[j].startTime.replace(
//               /\d{3}/g,
//               iMS
//             );
//           }
//         })();
//       }
//       const updatedSrt = await parser.toSrt(sub);
//       await writeSubToFile(outputNameAndPath, updatedSrt);
//     }

//     return sub;
//   } catch (err) {
//     if (err) throw err;
//   }
// };
