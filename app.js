/* ==========================================================================
   JS DOM Essentials - Lógica Principal (Ejercicios 1 a 4)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     Navegación / Filtro de Ejercicios (Todos / Básico / Pro)
     ------------------------------------------------------------------------ */
  const navBtns = document.querySelectorAll('.nav-btn');
  const cards = document.querySelectorAll('.exercise-card');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (targetTab === 'todos' || targetTab === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     EJERCICIO 1: Cambiar Color de Fondo
     ------------------------------------------------------------------------ */
  const demoBox1 = document.getElementById('demo-box-1');
  const btnChangeColor = document.getElementById('btn-change-color');
  const colorCodeDisplay = document.getElementById('color-code');

  // Arreglo de colores sobrios y elegantes
  const paletaColores = [
    '#18181b', '#27272a', '#1e293b', '#14532d', 
    '#1e3a8a', '#312e81', '#701a75', '#3f3f46'
  ];

  btnChangeColor.addEventListener('click', () => {
    // Seleccionar un color aleatorio de la paleta
    const nuevoColor = paletaColores[Math.floor(Math.random() * paletaColores.length)];
    
    // Aplicar estilo al DOM
    demoBox1.style.backgroundColor = nuevoColor;
    colorCodeDisplay.textContent = nuevoColor;
  });


  /* ------------------------------------------------------------------------
     EJERCICIO 2: Lista Dinámica en Memoria
     ------------------------------------------------------------------------ */
  const formLista = document.getElementById('form-lista');
  const inputItem = document.getElementById('input-item');
  const listaElementos = document.getElementById('lista-elementos');
  const listCount = document.getElementById('list-count');
  const btnClearList = document.getElementById('btn-clear-list');

  // Arreglo para guardar elementos en memoria
  let datosEnMemoria = [];

  function renderizarLista() {
    listaElementos.innerHTML = '';

    if (datosEnMemoria.length === 0) {
      listaElementos.innerHTML = '<li class="empty-msg">No hay elementos agregados aún.</li>';
      listCount.textContent = '0';
      return;
    }

    datosEnMemoria.forEach((itemTexto, indice) => {
      const li = document.createElement('li');
      
      const spanTexto = document.createElement('span');
      spanTexto.className = 'item-text';
      spanTexto.textContent = `${indice + 1}. ${itemTexto}`;

      const btnEliminar = document.createElement('button');
      btnEliminar.type = 'button';
      btnEliminar.className = 'delete-item-btn';
      btnEliminar.title = 'Eliminar elemento';
      btnEliminar.innerHTML = '🗑️';
      btnEliminar.addEventListener('click', () => {
        // Eliminar del arreglo en memoria por índice
        datosEnMemoria.splice(indice, 1);
        renderizarLista();
      });

      li.appendChild(spanTexto);
      li.appendChild(btnEliminar);
      listaElementos.appendChild(li);
    });

    listCount.textContent = datosEnMemoria.length;
  }

  formLista.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = inputItem.value.trim();
    if (texto !== '') {
      datosEnMemoria.push(texto); // Insertar en arreglo
      inputItem.value = '';
      inputItem.focus();
      renderizarLista();
    }
  });

  btnClearList.addEventListener('click', () => {
    datosEnMemoria = []; // Vaciar arreglo
    renderizarLista();
  });


  /* ------------------------------------------------------------------------
     EJERCICIO 3: Contador con Límite
     ------------------------------------------------------------------------ */
  const counterValue = document.getElementById('counter-value');
  const btnIncrement = document.getElementById('btn-increment');
  const btnDecrement = document.getElementById('btn-decrement');
  const btnResetCounter = document.getElementById('btn-reset-counter');
  const alertBanner = document.getElementById('alert-banner');

  let valorContador = 0;

  function actualizarContadorUI() {
    counterValue.textContent = valorContador;

    // Condicional: Si llega exactamente a 10
    if (valorContador === 10) {
      alertBanner.classList.remove('hidden');
      counterValue.classList.add('limit-reached');
      
      // Mostrar alerta interactiva
      setTimeout(() => {
        alert('⚠️ ¡Atención! Has alcanzado el límite máximo de 10 en el contador.');
      }, 50);
    } else {
      alertBanner.classList.add('hidden');
      counterValue.classList.remove('limit-reached');
    }
  }

  btnIncrement.addEventListener('click', () => {
    valorContador++;
    actualizarContadorUI();
  });

  btnDecrement.addEventListener('click', () => {
    valorContador--;
    actualizarContadorUI();
  });

  btnResetCounter.addEventListener('click', () => {
    valorContador = 0;
    actualizarContadorUI();
  });


  /* ------------------------------------------------------------------------
     EJERCICIO 4: Calculadora Funcional (SIN eval)
     ------------------------------------------------------------------------ */
  const calcDisplay = document.getElementById('calc-display');
  const calcHistory = document.getElementById('calc-history');
  const calcGrid = document.querySelector('.calc-grid');

  let operandoActual = '0';
  let operandoPrevio = '';
  let operadorActivo = null;
  let resetearAlEscribir = false;

  // Algoritmo de cálculo manual con condicionales / switch (SIN usar eval)
  function calcularManual(valA, operador, valB) {
    const a = parseFloat(valA);
    const b = parseFloat(valB);

    if (isNaN(a) || isNaN(b)) return valB;

    let resultado = 0;
    switch (operador) {
      case '+':
        resultado = a + b;
        break;
      case '-':
        resultado = a - b;
        break;
      case '*':
      case '×':
        resultado = a * b;
        break;
      case '/':
      case '÷':
        if (b === 0) return 'Error (div / 0)';
        resultado = a / b;
        break;
      case '%':
        resultado = a % b;
        break;
      default:
        return valB;
    }

    // Formatear decimales largos si existen
    if (typeof resultado === 'number' && !Number.isInteger(resultado)) {
      return parseFloat(resultado.toFixed(6));
    }
    return resultado;
  }

  function actualizarPantallaCalc() {
    calcDisplay.textContent = operandoActual;
    if (operadorActivo !== null && operandoPrevio !== '') {
      calcHistory.textContent = `${operandoPrevio} ${operadorActivo}`;
    } else {
      calcHistory.textContent = '';
    }
  }

  function agregarNumero(num) {
    if (operandoActual === '0' || resetearAlEscribir) {
      if (num === '.') {
        operandoActual = '0.';
      } else {
        operandoActual = num;
      }
      resetearAlEscribir = false;
    } else {
      if (num === '.' && operandoActual.includes('.')) return; // Evitar múltiples puntos decimales
      operandoActual += num;
    }
    actualizarPantallaCalc();
  }

  function seleccionarOperador(op) {
    if (operadorActivo !== null && !resetearAlEscribir) {
      // Calcular resultado intermedio si se encadenan operaciones
      operandoActual = String(calcularManual(operandoPrevio, operadorActivo, operandoActual));
    }
    operandoPrevio = operandoActual;
    operadorActivo = op;
    resetearAlEscribir = true;
    actualizarPantallaCalc();
  }

  function ejecutarIgual() {
    if (operadorActivo === null || operandoPrevio === '') return;

    const resultado = calcularManual(operandoPrevio, operadorActivo, operandoActual);
    calcHistory.textContent = `${operandoPrevio} ${operadorActivo} ${operandoActual} =`;
    operandoActual = String(resultado);
    operadorActivo = null;
    operandoPrevio = '';
    resetearAlEscribir = true;
    calcDisplay.textContent = operandoActual;
  }

  function limpiarCalculadora() {
    operandoActual = '0';
    operandoPrevio = '';
    operadorActivo = null;
    resetearAlEscribir = false;
    actualizarPantallaCalc();
  }

  function borrarUltimoDigito() {
    if (resetearAlEscribir) return;
    if (operandoActual.length === 1 || operandoActual === 'Error (div / 0)') {
      operandoActual = '0';
    } else {
      operandoActual = operandoActual.slice(0, -1);
    }
    actualizarPantallaCalc();
  }

  // Delegación de eventos en el grid de la calculadora
  calcGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const num = btn.getAttribute('data-num');
    const op = btn.getAttribute('data-op');
    const action = btn.getAttribute('data-action');

    if (num !== null) {
      agregarNumero(num);
    } else if (op !== null) {
      seleccionarOperador(op);
    } else if (action === 'clear') {
      limpiarCalculadora();
    } else if (action === 'backspace') {
      borrarUltimoDigito();
    } else if (action === 'equals') {
      ejecutarIgual();
    }
  });

});

/* ------------------------------------------------------------------------
   Función Global para pestañas de código explicativo (HTML/CSS/JS)
   ------------------------------------------------------------------------ */
function switchCodeTab(event, contentId) {
  const container = event.target.closest('.code-tabs-wrapper');
  
  // Desactivar botones de la misma tarjeta
  const tabLinks = container.querySelectorAll('.tab-link');
  tabLinks.forEach(tab => tab.classList.remove('active'));
  
  // Ocultar contenidos de la misma tarjeta
  const contents = container.querySelectorAll('.code-content');
  contents.forEach(c => c.classList.remove('active'));

  // Activar seleccionado
  event.target.classList.add('active');
  document.getElementById(contentId).classList.add('active');
}
