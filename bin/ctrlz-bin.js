#!/usr/bin/env node
console.log('ctrlz - Tu mente tiene un ctrl+z');
console.log('Esta es una version de demonstracion.');
console.log('Para mas informacion visita: https://ctrlz.app');

if (process.argv[2] === 'replay') {
  console.log('Funcionalidad replay no implementada aun.');
} else if (process.argv[2] === '--help' || process.argv[2] === '-h') {
  console.log('Uso: ctrlz <comando>');
  console.log('Comandos disponibles:');
  console.log('  replay    Repetir la ultima accion');
  console.log('  --help    Mostrar esta ayuda');
} else {
  console.log('Comando no reconocido. Usa --help para ver comandos disponibles.');
}