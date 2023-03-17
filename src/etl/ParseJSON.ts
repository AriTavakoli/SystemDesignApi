const fs = require('fs');
const readline = require('readline');

class ParseJSON {



  static search(filename, propertyName, propertyValue) {
    const readStream = fs.createReadStream(filename);
    const lineReader = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });
    const items = [];

    lineReader.on('line', (line) => {
      const obj = JSON.parse(line);
      if (obj[propertyName] === propertyValue) {
        console.log(obj);
        items.push(obj);
      }
    });

    return new Promise((resolve, reject) => {
      lineReader.on('close', () => {
        resolve(items);
      });
      lineReader.on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = ParseJSON;