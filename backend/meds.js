const { raw } = require('express');
const fs = require('fs');

let rawData = fs.readFileSync('meds.json');
let meds = JSON.parse(rawData);

module.exports = meds;