// Seleccionar elementos del DOM
const btnCambiar = document.getElementById('btnCambiar');
const contenedor = document.getElementById('contenedor');
const codigoColor = document.getElementById('codigoColor');

// Arreglo con lista de colores
const colores = [
  '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', 
  '#f59e0b', '#ec4899', '#06b6d4', '#84cc16'
];

// Evento de click para cambiar el color de fondo
btnCambiar.addEventListener('click', function() {
  // Generar un número aleatorio para el índice del arreglo
  const indiceAleatorio = Math.floor(Math.random() * colores.length);
  const colorSeleccionado = colores[indiceAleatorio];

  // Aplicar el nuevo color al contenedor y actualizar texto
  contenedor.style.backgroundColor = colorSeleccionado;
  codigoColor.textContent = colorSeleccionado;
});
