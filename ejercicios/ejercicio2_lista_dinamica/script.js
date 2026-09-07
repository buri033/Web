// Referencias a los elementos del DOM
const inputTexto = document.getElementById('inputTexto');
const btnAgregar = document.getElementById('btnAgregar');
const miLista = document.getElementById('miLista');
const totalItems = document.getElementById('totalItems');

// Arreglo en memoria para almacenar los datos introducidos
const arregloEnMemoria = [];

// Función para actualizar y renderizar la lista en el DOM
function actualizarDOM() {
  // Limpiar el contenido actual de la lista
  miLista.innerHTML = '';

  // Recorrer cada elemento del arreglo en memoria
  arregloEnMemoria.forEach((texto, indice) => {
    const li = document.createElement('li');
    li.textContent = texto;

    // Crear un botón para eliminar individualmente del arreglo
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.addEventListener('click', () => {
      // Eliminar elemento del arreglo por su índice
      arregloEnMemoria.splice(indice, 1);
      // Volver a renderizar
      actualizarDOM();
    });

    li.appendChild(btnEliminar);
    miLista.appendChild(li);
  });

  // Actualizar el contador de elementos
  totalItems.textContent = arregloEnMemoria.length;
}

// Evento al presionar el botón "Agregar"
btnAgregar.addEventListener('click', () => {
  const valor = inputTexto.value.trim();

  if (valor !== '') {
    // Guardar en el arreglo en memoria
    arregloEnMemoria.push(valor);
    
    // Limpiar el campo del input
    inputTexto.value = '';
    
    // Actualizar la interfaz gráfica
    actualizarDOM();
  }
});
