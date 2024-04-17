module.exports = {
  artifactsDir: './build',
  sourceDir: './build/WebExtension/firefox',
  verbose: true,
  build: {
    asNeeded: false,
    overwriteDest: true,
  },
  run: {
    args: ['-devtools'],
    firefox: 'firefox',
    firefoxProfile: 'MagicPH',
    startUrl: ['https://pornhub.com'],
    watchFile: ['./build/WebExtension/firefox/*']
  },
  ignoreFiles: [
    '*.web-extension-id',
    'web-ext-artifacts'
  ],
};
