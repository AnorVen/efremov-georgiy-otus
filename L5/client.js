const http = require('http');
var argv = require('minimist')(process.argv.slice(2));

let typeOfRequests = argv['t'];
let quantityOfRequests = argv['n'];

console.log(
  `START PROCESS\n TYPE OF REQUEST: ${typeOfRequests}\n QUANTITY: ${quantityOfRequests}\n`
);

let counter = 0;

const req = () => {
  return new Promise((resolve, reject) => {
    http
      .get(`http://localhost:3000/id=${counter}`, res => {
        let content = '';
        res.on('data', chunk => {
          content += chunk;
        }),
          res.on('end', () => {
            resolve(content);
          });
      })
      .on('error', error => reject(console.log('ERROR', error)));
  });
};


const requestByType = async (quantityOfRequests, typeOfRequests) => {
  if (typeOfRequests === 'parallel') {
    while (counter < quantityOfRequests) {
      counter = counter + 1;
      req()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  } else if (typeOfRequests === 'serial') {
    while (counter < quantityOfRequests) {
      counter = counter + 1;
      const resp = await req();
      console.log(resp);
    }
  }
};

requestByType(quantityOfRequests, typeOfRequests);




