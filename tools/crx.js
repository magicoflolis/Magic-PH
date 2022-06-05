const crx3 = require('crx3');

crx3(['../src/manifest/chrome.json'], {
  keyPath: '../tools/key.pem',
  crxPath: '../build/magicph.crx',
  zipPath: '../build/magicph.zip',
  xmlPath: 'https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/version/updates.xml',
  crxURL : 'https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.crx'
}).then(() => console.log('done')).catch(console.error);