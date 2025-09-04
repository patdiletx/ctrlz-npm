#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const binPath = path.join(__dirname, 'ctrlz-bin.exe');

const child = spawn(binPath, process.argv.slice(2), {
  stdio: 'inherit'
});

child.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.error('❌ No se encontró el binario. Ejecuta `npm install -g ctrlz-cli` para descargarlo.');
  } else {
    console.error('❌ Error al ejecutar ctrlz:', err.message);
  }
  process.exit(1);
});