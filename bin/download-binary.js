// bin/download-binary.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const BINARY_URL = 'https://github.com/patdiletx/ctrlz/releases/download/v0.1.0/ctrlz.exe';
const OUTPUT_PATH = path.join(__dirname, 'ctrlz-bin.exe');

console.log('📥 Descargando ctrlz desde:', BINARY_URL);

const file = fs.createWriteStream(OUTPUT_PATH);

https.get(BINARY_URL, (response) => {
  if (response.statusCode !== 200) {
    console.error('❌ Error al descargar:', response.statusCode);
    fs.unlinkSync(OUTPUT_PATH);
    process.exit(1);
    return;
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close(() => {
      console.log('✅ ctrlz descargado como:', OUTPUT_PATH);
    });
  });
}).on('error', (err) => {
  console.error('❌ Error de red:', err.message);
  fs.unlinkSync(OUTPUT_PATH);
  process.exit(1);
});