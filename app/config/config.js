const defaultConfig = './config-default.js';
const prodConfig = './config-prod.js';
const testConfig = './config-test.js';

const fs = require('fs');
var config = null;
console.log('当前环境' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test') {
    console.log('load testconfig');
    config = require(testConfig);
} else if (process.env.NODE_ENV === 'production') {
    console.log('load prodConfig');
    config = require(prodConfig);
} else {
    console.log('load defaultConfig');
    config = require(defaultConfig);
}
module.exports = config;