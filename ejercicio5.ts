const numeros: number[] = [15, 42, 68, 23, 89, 12, 54, 77, 31, 95];

const sumaTotal = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
const promedio = sumaTotal / numeros.length;

console.log(`El promedio de los números es: ${promedio}`);