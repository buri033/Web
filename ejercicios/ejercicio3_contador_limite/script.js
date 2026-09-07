// Variable de estado para guardar el número del contador
let contador = 0;

// Obtener elementos del DOM
const valorContador = document.getElementById('valorContador');
const btnSumar = document.getElementById('btnSumar');
const btnRestar = document.getElementById('btnRestar');
const alerta = document.getElementById('alerta');

// Función para actualizar la interfaz del contador
function actualizarContador() {
  valorContador.textContent = contador;

  // Condicional: Si el contador llega exactamente a 10
  if (contador === 10) {
    alerta.style.display = 'block';
    valorContador.classList.add('limite');
    
    // Alerta del sistema
    alert('⚠️ ¡Atención! El contador ha llegado a 10.');
  } else {
    alerta.style.display = 'none';
    valorContador.classList.remove('limite');
  }
}

// Evento para incrementar (+)
btnSumar.addEventListener('click', function() {
  contador++;
  actualizarContador();
});

// Evento para decrementar (-)
btnRestar.addEventListener('click', function() {
  contador--;
  actualizarContador();
});
