module.exports = {
  artifactsDir: './build',
  sourceDir: './dist',
  verbose: true,
  build: {
    asNeeded: false,
    overwriteDest: true,
  },
  run: {
    args: ['-devtools'],
    chromiumBinary: './chrome/chrlauncher.exe',
    chromiumProfile: './chrome/profile',
    firefox: 'firefoxdeveloperedition',
    firefoxProfile: 'debug',
    startUrl: ['https://pornhub.com'],
    watchFile: ['./dist/js/*', './dist/css/*']
  },
  ignoreFiles: [
    'package-lock.json',
    'yarn.lock',
  ],
};
