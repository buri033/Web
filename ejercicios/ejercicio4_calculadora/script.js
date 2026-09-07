// Variables de estado para la calculadora
let valorActual = '0';
let valorAnterior = '';
let operacionPendiente = null;
let reiniciarPantalla = false;

const pantalla = document.getElementById('pantalla');

// Función manual para calcular operaciones SIN usar eval()
function realizarCalculoManual(a, operador, b) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  if (isNaN(num1) || isNaN(num2)) return b;

  switch (operador) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error';
    case '%':
      return num1 % num2;
    default:
      return b;
  }
}

// Función para actualizar la pantalla
function actualizarPantalla() {
  pantalla.textContent = valorActual;
}

// Agregar número o punto decimal
function numero(val) {
  if (valorActual === '0' || reiniciarPantalla) {
    valorActual = (val === '.') ? '0.' : val;
    reiniciarPantalla = false;
  } else {
    if (val === '.' && valorActual.includes('.')) return; // Evita duplicar el punto
    valorActual += val;
  }
  actualizarPantalla();
}

// Seleccionar operador (+, -, *, /, %)
function operar(op) {
  if (operacionPendiente !== null && !reiniciarPantalla) {
    valorActual = String(realizarCalculoManual(valorAnterior, operacionPendiente, valorActual));
  }
  valorAnterior = valorActual;
  operacionPendiente = op;
  reiniciarPantalla = true;
  actualizarPantalla();
}

// Botón Igual (=)
function calcularIgual() {
  if (operacionPendiente === null || valorAnterior === '') return;

  const resultado = realizarCalculoManual(valorAnterior, operacionPendiente, valorActual);
  valorActual = String(resultado);
  operacionPendiente = null;
  valorAnterior = '';
  reiniciarPantalla = true;
  actualizarPantalla();
}

// Botón Limpiar (C)
function limpiar() {
  valorActual = '0';
  valorAnterior = '';
  operacionPendiente = null;
  reiniciarPantalla = false;
  actualizarPantalla();
}

// Botón Borrar (⌫)
function borrar() {
  if (reiniciarPantalla) return;
  if (valorActual.length === 1 || valorActual === 'Error') {
    valorActual = '0';
  } else {
    valorActual = valorActual.slice(0, -1);
  }
  actualizarPantalla();
}
