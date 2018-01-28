const audienceData = new Map([
  [0, require('./data/audience1.json')],
  [1, require('./data/audience2.json')],
  [2, { audience: [] }],
]);

const bandwidthData = new Map([
  [0, require('./data/bandwidth1.json')],
  [1, require('./data/bandwidth2.json')],
  [2, { cdn: [], p2p: [] }],
]);

const streamData = new Map([
  [0, require('./data/streams1.json')],
  [1, require('./data/streams2.json')],
  [2, []],
]);

const data1 =require('./data/bandwidth2.json')
const output = []
let timestamp = 1509490800000
for (let i = 0; i < 4; i++) {
data1['p2p'].forEach((cell) => {
  if (cell[1]) {
  timestamp += 3600000
  output.push([timestamp, cell[1]])
}
})
}
let data = JSON.stringify(output)
const fs = require('fs');
fs.writeFile('bandwidth2-p2p-expanded.json', data, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('output saved!');
});
//console.log(output);
