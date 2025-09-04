// bin/download-binary.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const BINARY_URL = 'https://github.com/patdiletx/ctrlz/releases/download/v0.3.0/ctrlz.exe';
const OUTPUT_PATH = path.join(__dirname, 'ctrlz-bin.exe');

console.log('📥 Descargando ctrlz desde:', BINARY_URL);

function download(url) {
  https.get(url, (response) => {
    // Si hay redirección, sigue la nueva URL
    if (response.statusCode === 301 || response.statusCode === 302) {
      const redirectUrl = response.headers.location;
      console.log('🔁 Redirigiendo a:', redirectUrl);
      download(redirectUrl);
      return;
    }

    if (response.statusCode !== 200) {
      console.error('❌ Error al descargar:', response.statusCode);
      fs.unlinkSync(OUTPUT_PATH);
      process.exit(1);
      return;
    }

    const file = fs.createWriteStream(OUTPUT_PATH);
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
}

download(BINARY_URL);