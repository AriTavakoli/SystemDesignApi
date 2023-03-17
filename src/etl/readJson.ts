const fs = require('fs');



const filePathQuestions = 'C://Desktop1//ProfileData//JSON//answers.json';

function printFirst10ObjectsFromFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  let count = 0;

  readStream.on('data', (chunk) => {
    const lines = chunk.toString().split('\n');
    for (const line of lines) {
      if (line.trim() !== '') {
        const jsonObj = JSON.parse(line);
        console.log(jsonObj);
        count++;
        if (count === 10) { // Exit the loop after 10 items have been processed
          readStream.destroy();
          break;
        }
      }
    }
  });

  readStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  readStream.on('end', () => {
    console.log('Finished reading file.');
  });
}

// Example usage: print the first 10 objects from the file 'data.json'
printFirst10ObjectsFromFile(filePathQuestions);
